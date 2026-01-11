import { useState } from "react";
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

export default function Index() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo App 📝</Text>

      {/* Input */}
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

      {/* List */}
      <FlatList
        data={todos}
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
