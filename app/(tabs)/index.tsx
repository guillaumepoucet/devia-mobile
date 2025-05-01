import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Svg, { Path } from "react-native-svg";
import ContainerLayout from "@/components/ContainerLayout";

export function CustomGroup() {
  return (
    <Svg width="273" height="213" viewBox="0 0 273 213" fill="none">
      <Path
        d="M140 190C189.706 190 230 149.706 230 100C230 50.2944 189.706 10 140 10C90.2944 10 50 50.2944 50 100C50 149.706 90.2944 190 140 190Z"
        fill="#FEC43C"
      />
      <Path
        d="M12.6087 113H130.391C131.879 113 133.305 113.492 134.357 114.367C135.409 115.242 136 116.429 136 117.667V164.333C136 165.571 135.409 166.758 134.357 167.633C133.305 168.508 131.879 169 130.391 169H74.3043L57.4783 183L54.6739 169H12.6087C11.1212 169 9.69458 168.508 8.64275 167.633C7.59091 166.758 7 165.571 7 164.333V117.667C7 116.429 7.59091 115.242 8.64275 114.367C9.69458 113.492 11.1212 113 12.6087 113Z"
        fill="#FFB7C3"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Path
        d="M262.195 32.057H146.805C145.348 32.057 143.95 32.5338 142.919 33.3826C141.889 34.2313 141.31 35.3824 141.31 36.5827V81.8401C141.31 83.0404 141.889 84.1915 142.919 85.0403C143.95 85.889 145.348 86.3658 146.805 86.3658H201.753L218.237 99.943L220.984 86.3658H262.195C263.652 86.3658 265.05 85.889 266.081 85.0403C267.111 84.1915 267.69 83.0404 267.69 81.8401V36.5827C267.69 35.3824 267.111 34.2313 266.081 33.3826C265.05 32.5338 263.652 32.057 262.195 32.057Z"
        fill="#A8B88B"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <ContainerLayout>
        <View style={{ paddingTop: 40 }} />
        <View style={{ flex: 0, alignItems: "center", marginVertical: 40 }}>
          <CustomGroup />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            Création d&apos;une application mobile d&apos;assistant personnel
          </Text>
          <Text style={styles.paragraph}>
            Vous êtes missionné(e) pour développer une petite application mobile
            qui sert d&apos;assistant personnel. L&apos;utilisateur peut lui
            poser une question simple, et l&apos;assistant répond grâce à une
            intelligence artificielle (IA) connectée via une API.
          </Text>
          <Text style={styles.subtitle}>Objectifs</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              - Créer une application fonctionnelle sous React Native (avec Expo
              Router).
            </Text>
            <Text style={styles.listItem}>
              - Offrir une interface utilisateur intuitive et agréable.
            </Text>
            <Text style={styles.listItem}>
              - Permettre la saisie d&apos;une question et l&apos;affichage
              d&apos;une réponse.
            </Text>
          </View>
        </View>
      </ContainerLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Glyphic",
    fontSize: 32,
    lineHeight: 40,
  },
  paragraph: {
    marginVertical: 12,
    fontSize: 18,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 12,
    fontFamily: "Glyphic",
  },
  listContainer: {
    margin: 24,
    fontSize: 18,
    lineHeight: 24,
  },
  listItem: {
    marginVertical: 4,
    fontSize: 16,
    lineHeight: 24,
  },
});
