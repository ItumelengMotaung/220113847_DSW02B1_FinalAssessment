import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function ReportCard({ report, onToggle }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(slide, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const resolved = report.resolved;

  return (
    <Animated.View
      style={[
        styles.card,
        resolved ? styles.cardResolved : styles.cardOpen,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.category}>{report.category}</Text>
        <Text
          style={[
            styles.badge,
            resolved ? styles.badgeResolved : styles.badgeOpen,
          ]}
        >
          {resolved ? "✔ Resolved" : "● Open"}
        </Text>
      </View>

      <Text style={[styles.location, resolved && styles.struck]}>
        {report.locationText}
      </Text>
      <Text style={styles.description}>{report.description}</Text>

      <Pressable
        onPress={() => onToggle(report.id)}
        style={({ pressed }) => [
          styles.button,
          resolved && styles.buttonAlt,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, resolved && styles.buttonTextAlt]}>
          {resolved ? "Reopen report" : "Mark as resolved"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardOpen: { borderLeftColor: "#DE3831", backgroundColor: "#FFFFFF" },
  cardResolved: { borderLeftColor: "#007A4D", backgroundColor: "#EEF6F1" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0A2472",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  badgeOpen: { backgroundColor: "#FDECEB", color: "#C62828" },
  badgeResolved: { backgroundColor: "#D5ECDD", color: "#007A4D" },
  location: { fontSize: 17, fontWeight: "700", color: "#14202B", marginTop: 8 },
  struck: { color: "#5B6773", textDecorationLine: "line-through" },
  description: {
    fontSize: 14,
    color: "#5B6773",
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    minHeight: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007A4D",
  },
  buttonAlt: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#007A4D",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  buttonTextAlt: { color: "#007A4D" },
  pressed: { opacity: 0.7 },
});
