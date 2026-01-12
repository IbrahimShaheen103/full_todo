import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Details() {
  const { title, details, done } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.status}>
        {done === "true" ? "✅ Completed" : "⏳ Not Done"}
      </Text>

      <Text style={styles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    lineHeight: 22,
  },
});
