import { Text, View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 60,
      }}
    >
      {children}
    </View>
  );
}
