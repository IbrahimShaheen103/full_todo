import { useLocalSearchParams } from "expo-router";
import { Key } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const { title, details, done, dueDate, images } = useLocalSearchParams();
  const imgs = images ? JSON.parse(images as string) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.status}>
        {done === "true" ? "✅ Completed" : "⏳ Not Done"}
      </Text>
      {dueDate && <Text>📅 {new Date(dueDate as string).toDateString()}</Text>}

      <Text style={styles.details}>{details}</Text>
      <ScrollView horizontal>
        {imgs.map((uri: any, i: Key | null | undefined) => (
          <Image
            key={i}
            source={{ uri }}
            style={{ width: 120, height: 120, marginRight: 10 }}
          />
        ))}
      </ScrollView>
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
