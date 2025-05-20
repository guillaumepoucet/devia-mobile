import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Chat, GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "@/lib/env";
import JumpingCirclesSameSize from "@/components/JumpinDots";
// import JumpingCirclesSameSize from "@/components/JumpinDots";

type Message = {
  role: "user" | "assistant";
  content: string;
  date: string;
};

const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet";
        height.value = Math.max(event.height, 0);
      },
    },
    []
  );

  return { height };
};

export function createSmsChatSession() {
  const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const chat = genAI.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Tu es un assistant intégré dans une application de type messagerie SMS. Tes réponses doivent être courtes, directes, sans politesse excessive ni mise en forme. Va à l'essentiel.",
          },
        ],
      },
    ],
  });

  return chat;
}

export default function ChatScreen() {
  const { height } = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : 0,
    };
  }, []);

  const RenderItem = useCallback(
    ({ item, date = true, ...props }: any) => (
      <View style={styles.renderItemContainer} {...props}>
        <View
          style={[
            styles.renderItemMessage,
            {
              marginRight: item.role === "user" ? 0 : "auto",
              marginLeft: item.role === "user" ? "auto" : 0,
              backgroundColor: item.role === "user" ? "#e0f7fa" : "#fff",
            },
          ]}
        >
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
        </View>
        {date && (
          <Text
            style={[
              styles.renderItemDate,
              {
                marginRight: item.role === "user" ? 0 : "auto",
                marginLeft: item.role === "user" ? "auto" : 0,
              },
            ]}
          >
            {new Date(item.date).toLocaleString()}
          </Text>
        )}
      </View>
    ),
    []
  ); // Ajoutez une dépendance vide pour éviter les re-rendus inutiles

  const [isAtBottom, setIsAtBottom] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  const [refreshing, setRefreshing] = useState(false);

  const [chat, setChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState(""); // Changed from Message[] to Message
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!GEMINI_API_KEY) {
    console.warn("Aucune clé GEMINI_API_KEY définie");
  }

  useEffect(() => {
    const chatSession = createSmsChatSession();
    setChat(chatSession);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);
    setMessages([]);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSendMessage = async () => {
    setError(null);
    if (!message.trim() || !chat) return;

    const newMessage: Message = {
      role: "user",
      content: message,
      date: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: newMessage.content });
      if (response.text) {
        const responseMessage: Message = {
          role: "assistant",
          content: response.text,
          date: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      } else {
        setError("Aucune réponse reçue.");
      }
    } catch (err) {
      console.error("Erreur Gemini :", err);
      setError("Une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  };

  const invertedMessages = [...messages].reverse();

  return (
    <View style={styles.container}>
      {!process.env.GEMINI_API_KEY && (
        <Text style={styles.errorText}>
          Veuillez définir la clé API dans le fichier .env
        </Text>
      )}
      <FlatList
        inverted
        ref={flatListRef}
        data={invertedMessages} // Inverser les messages pour afficher le plus récent en bas
        style={styles.list}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        keyboardDismissMode="on-drag"
        onEndReached={() => setIsAtBottom(true)}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => setIsAtBottom(false)}
        onContentSizeChange={() => {
          // Scroll to the bottom when new messages are added
          if (messages.length > 0) {
            setTimeout(() => {
              // Use setTimeout to ensure the scroll happens after the render
              flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            }, 100);
          }
        }}
        onLayout={() => {
          // Scroll to the bottom when the layout changes
          if (isAtBottom && messages.length > 0) {
            flatListRef.current?.scrollToIndex({ index: 0, animated: true });
          }
        }}
        onScrollToIndexFailed={() => {
          // Handle the case when scrolling to an index fails
          flatListRef.current?.scrollToIndex({ index: 0, animated: true });
        }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isLoading && (
        <View
          style={[
            styles.renderItemMessage,
            {
              marginHorizontal: 20,
              marginBottom: 10,
              paddingTop: 24,
              backgroundColor: "#fff",
            },
          ]}
        >
          <JumpingCirclesSameSize />
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Posez votre question..."
          multiline
          numberOfLines={3}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <FontAwesome
            name="send-o"
            size={24}
            color={Colors.light.text} // Remplacez Colors.dark.text si nécessaire
          />
        </TouchableOpacity>
      </View>
      <Animated.View style={fakeView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderTopWidth: 0.75,
    borderColor: Colors.dark.text,
    flexDirection: "row",
  },
  input: {
    paddingHorizontal: 10,
    minHeight: 40,
    width: "80%",
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderLeftWidth: 0.75,
    borderColor: Colors.dark.text,
    marginLeft: "auto",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  renderItemContainer: {
    marginVertical: 10,
  },
  renderItemMessage: {
    marginRight: "auto",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    maxWidth: "80%",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "black", // Remplacez Colors.dark.text si nécessaire
  },
  renderItemDate: {
    fontSize: 10,
    color: Colors.dark.text,
  },
});
