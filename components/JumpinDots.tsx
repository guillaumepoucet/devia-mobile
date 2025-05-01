import React, { useState, useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const JumpingCirclesSameSize = () => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  const dotAnimation = (dotAnim: Animated.Value, delay: number) => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(dotAnim, {
        toValue: -8, // Hauteur du saut (négatif pour monter)
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dotAnim, {
        toValue: 0, // Retour à la position initiale
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => dotAnimation(dotAnim, 0));
  };

  useEffect(() => {
    dotAnimation(dot1Anim, 0);
    dotAnimation(dot2Anim, 200);
    dotAnimation(dot3Anim, 400);
  }, []);

  const dotSize = 6; // Taille constante des cercles

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            transform: [{ translateY: dot1Anim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            transform: [{ translateY: dot2Anim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            transform: [{ translateY: dot3Anim }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "gray",
    marginHorizontal: 3,
  },
});

export default JumpingCirclesSameSize;
