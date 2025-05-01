import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

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

export default function ChatScreen() {
  const { height } = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : 0,
    };
  }, []);

  const data = [
    {
      role: "user",
      content: "Bonjour, comment ça va ?",
      date: "2023-10-01T12:00:00Z",
    },
    {
      role: "assistant",
      content: "Bonjour ! Je vais bien, merci. Et vous ?",
      date: "2023-10-01T12:00:05Z",
    },
    {
      role: "user",
      content: "Peux-tu me parler de la météo ?",
      date: "2023-10-01T12:00:10Z",
    },
    {
      role: "assistant",
      content: "Bien sûr ! Quelle ville vous intéresse ?",
      date: "2023-10-01T12:00:15Z",
    },
    { role: "user", content: "Paris", date: "2023-10-01T12:00:20Z" },
    {
      role: "assistant",
      content: "La météo à Paris est ensoleillée aujourd'hui.",
      date: "2023-10-01T12:00:25Z",
    },
    {
      role: "user",
      content: "Merci !",
      date: "2023-10-01T12:00:30Z",
    },
    {
      role: "assistant",
      content: "De rien ! Si vous avez d'autres questions, n'hésitez pas.",
      date: "2023-10-01T12:00:35Z",
    },
    { role: "user", content: "Paris", date: "2023-10-01T12:00:20Z" },
    {
      role: "assistant",
      content: "La météo à Paris est ensoleillée aujourd'hui.",
      date: "2023-10-01T12:00:25Z",
    },
    {
      role: "user",
      content: "Merci !",
      date: "2023-10-01T12:00:30Z",
    },
    {
      role: "assistant",
      content: "De rien ! Si vous avez d'autres questions, n'hésitez pas.",
      date: "2023-10-01T12:00:35Z",
    },
  ];

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            marginRight: item.role === "user" ? 0 : "auto",
            marginLeft: item.role === "user" ? "auto" : 0,
            backgroundColor: item.role === "user" ? "#e0f7fa" : "#fff",
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 5,
            maxWidth: "80%",
            justifyContent: "flex-start",
            borderWidth: 1,
            borderColor: "black", // Remplacez Colors.dark.text si nécessaire
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
        </View>
        <Text
          style={{
            fontSize: 10,
            color: Colors.dark.text,
            marginRight: item.role === "user" ? 0 : "auto",
            marginLeft: item.role === "user" ? "auto" : 0,
          }}
        >
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
    ),
    []
  ); // Ajoutez une dépendance vide pour éviter les re-rendus inutiles

  const [isAtBottom, setIsAtBottom] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("isAtBottom", isAtBottom);

  const handleSendMessage = () => {
    const newMessage = {
      role: "user",
      content: message,
      date: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        style={styles.list}
        renderItem={renderItem}
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
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }
        }}
        onLayout={() => {
          // Scroll to the bottom when the layout changes
          if (isAtBottom && messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
        }}
        onScrollToIndexFailed={() => {
          // Handle the case when scrolling to an index fails
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        keyboardShouldPersistTaps="handled"
      />
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
});
