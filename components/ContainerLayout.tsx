import { Text, View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContainerLayout({
  children,
  flex = false,
}: {
  children: React.ReactNode;
  flex?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: flex ? 1 : undefined,
        paddingTop: 20 + insets.top,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {children}
    </View>
  );
}
