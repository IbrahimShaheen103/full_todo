import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

type Todo = {
  id: string;
  title: string;
  details: string;
  done: boolean;
};

const STORAGE_KEY = "MY_TODOS";

export default function Index() {
  const [text, setText] = useState("");
  const [details, setDetails] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "active">("all");

  const router = useRouter();

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const loadTodos = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) setTodos(JSON.parse(json));
  };

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: text,
        details,
        done: false,
      },
    ]);

    setText("");
    setDetails("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    const match = todo.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "done") return todo.done && match;
    if (filter === "active") return !todo.done && match;
    return match;
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>My Todo App 📝</Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Todo title..."
          style={styles.input}
        />

        <TextInput
          value={details}
          onChangeText={setDetails}
          placeholder="Details..."
          style={[styles.input, { height: 80 }]}
          multiline
        />

        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />

        <View style={styles.filterRow}>
          {["all", "done", "active"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f as any)}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.todoItem}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    title: item.title,
                    details: item.details,
                    done: item.done.toString(),
                  },
                })
              }
            >
              <TouchableOpacity
                style={[styles.checkbox, item.done && styles.checkboxDone]}
                onPress={() => toggleTodo(item.id)}
              />

              <View style={{ flex: 1 }}>
                <Text style={[styles.todoText, item.done && styles.todoDone]}>
                  {item.title}
                </Text>

                <Text numberOfLines={2} style={styles.todoDetails}>
                  {item.details}
                </Text>
              </View>

              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
