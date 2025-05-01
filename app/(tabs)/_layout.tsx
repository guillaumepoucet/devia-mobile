import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Tabs, useSegments } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  iconSet: "FontAwesome" | "FontAwesome6";
  name:
    | React.ComponentProps<typeof FontAwesome>["name"]
    | React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  const { iconSet, ...iconProps } = props;

  if (iconSet === "FontAwesome") {
    return (
      <FontAwesome size={28} style={{ marginBottom: -3 }} {...iconProps} />
    );
  } else if (iconSet === "FontAwesome6") {
    return (
      <FontAwesome6 size={24} style={{ marginBottom: -3 }} {...iconProps} />
    );
  }

  return null;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const segment = useSegments();
  // get the current page from the segment
  const page = segment[segment.length - 1];
  // create an array of list pages you want to hide the tab bar in
  const pagesToHideTabBar = ["chat"];

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTintColor: Colors[colorScheme ?? "light"].text,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarActiveBackgroundColor: Colors[colorScheme ?? "light"].accent,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].background,
          height: 60,
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },

        tabBarIconStyle: {
          marginBottom: 5,
        },
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              iconSet="FontAwesome6"
              name="hard-drive"
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Chat",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconSet="FontAwesome" name="comments-o" color={color} />
          ),
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome6
                    name="bars-staggered"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{
                      marginLeft: 15,
                      marginRight: 4,
                      opacity: pressed ? 1 : 0.75,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
