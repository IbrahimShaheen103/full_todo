import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TodoForm from "../components/TodoForm";
import styles from "./styles";

type Todo = {
  id: string;
  title: string;
  details: string;
  done: boolean;
  dueDate: string | null;
  images: string[];
};

const STORAGE_KEY = "MY_TODOS";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "active">("all");
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.08)).current;
  const snackbarAnim = useRef(new Animated.Value(0)).current;
  const [lastDeletedTodos, setLastDeletedTodos] = useState<Todo[] | null>(null);
  const [showUndo, setShowUndo] = useState(false);
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
  const closeAlert = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAlert(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>My Todo App 📝</Text>

        {/* 🔍 Search */}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search todos..."
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

        {/* Todo List */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
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
                    dueDate: item.dueDate || "",
                    images: JSON.stringify(item.images),
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

                {item.dueDate && (
                  <Text style={styles.dueDate}>
                    📅 {new Date(item.dueDate).toDateString()}
                  </Text>
                )}
              </View>

              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        {/* floating Delete all list item button */}
        {todos.length > 0 && (
          <TouchableOpacity
            style={styles.deleteAllBtn}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowAlert(true);
              Animated.parallel([
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          >
            <Text style={styles.deleteAllText}>🗑</Text>
          </TouchableOpacity>
        )}
        {/* Alert for delete all todos */}
        {showAlert && (
          <Animated.View style={[styles.alertContainer, { opacity: fadeAnim }]}>
            <Animated.View
              style={[styles.alertBox, { transform: [{ scale: scaleAnim }] }]}
            >
              <Text style={styles.alertText}>
                Are you sure you want to delete all todos?
              </Text>
              <View style={styles.alertButtons}>
                <TouchableOpacity
                  style={styles.alertButton}
                  onPress={() => {
                    setLastDeletedTodos(todos);
                    setShowUndo(true);
                    Animated.timing(snackbarAnim, {
                      toValue: 1,
                      duration: 250,
                      useNativeDriver: true,
                    }).start();
                    setTodos([]);
                    closeAlert();
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Error
                    );
                    setTimeout(() => {
                      Animated.timing(snackbarAnim, {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: true,
                      }).start(() => {
                        setShowUndo(false);
                        setLastDeletedTodos(null);
                      });
                    }, 5000);
                  }}
                >
                  <Text style={styles.alertButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.alertButton}
                  onPress={() => {
                    closeAlert();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Text style={styles.alertButtonTextNo}>No</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}
        {/* Undo Snackbar */}
        {showUndo && lastDeletedTodos && (
          <Animated.View
            style={[
              styles.undo,
              {
                opacity: snackbarAnim,
                transform: [
                  {
                    translateY: snackbarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [60, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={{ color: "#fff" }}> All todos deleted</Text>
            <TouchableOpacity
              onPress={() => {
                if (lastDeletedTodos) {
                  setTodos(lastDeletedTodos);
                  setLastDeletedTodos(null);
                  setShowUndo(false);
                }
              }}
            >
              <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>UNDO</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {/* Floating Add Button */}
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        {/* Popup Form */}
        <TodoForm
          visible={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={(data: {
            title: string;
            details: string;
            images: string[];
            dueDate: Date | null;
          }) => {
            setTodos((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                title: data.title,
                details: data.details,
                images: data.images,
                dueDate: data.dueDate ? data.dueDate.toString() : null,
                done: false,
              },
            ]);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
