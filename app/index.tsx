import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const STORAGE_KEY = "MY_TODOS";

export default function Index() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "active">("all");

  // Load todos on start
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos when changed
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const loadTodos = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        setTodos(JSON.parse(json));
      }
    } catch (e) {
      console.error("Failed to load todos.", e);
    }
  };

  const addTodo = () => {
    if (text.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: text,
        done: false,
      },
    ]);

    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Apply search & filter
  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "done") return todo.done && matchSearch;
    if (filter === "active") return !todo.done && matchSearch;

    return matchSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo App 📝</Text>

      {/* Add Todo */}
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.searchInput}
      />

      {/* Filters */}
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

      {/* List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.done && styles.checkboxDone]}
              onPress={() => toggleTodo(item.id)}
            />

            <Text style={[styles.todoText, item.done && styles.todoDone]}>
              {item.title}
            </Text>

            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
