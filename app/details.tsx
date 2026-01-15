import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditForm from "../components/EditForm/EditForm";
import styles from "./Details.styles";
const STORAGE_KEY = "MY_TODOS";
const { width } = Dimensions.get("window");

type Todo = {
  id: string;
  title: string;
  details: string;
  done: boolean;
  dueDate: string | null;
  images: string[];
};

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    loadTodo();
  }, []);

  const loadTodo = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return;
    const list: Todo[] = JSON.parse(json);
    const found = list.find((t) => t.id === id);
    if (found) setTodo(found);
  };

  const saveTodo = async (updated: Todo) => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return;

    const list: Todo[] = JSON.parse(json).map((t: Todo) =>
      t.id === updated.id ? updated : t
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setTodo(updated);
  };

  const toggleDone = async () => {
    if (!todo) return;

    const updated = { ...todo, done: !todo.done };
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    saveTodo(updated);
  };
  const deleteTodo = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return;

    const list: Todo[] = JSON.parse(json).filter((t: Todo) => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    router.back();
  };
  if (!todo) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Task</Text>

        <TouchableOpacity onPress={() => setShowEdit(true)}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.title}>{todo.title}</Text>

        <TouchableOpacity
          style={[styles.doneBtn, todo.done && styles.doneActive]}
          onPress={toggleDone}
        >
          <Text style={styles.doneText}>
            {todo.done ? "✔ Completed" : "Mark as Done"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowDeleteAlert(true);
          }}
        >
          <Text style={styles.deleteText}>🗑 Delete Task</Text>
        </TouchableOpacity>

        {todo.dueDate && (
          <Text style={styles.date}>
            📅 {new Date(todo.dueDate).toDateString()}
          </Text>
        )}

        <Text style={styles.details}>{todo.details}</Text>

        {todo.images.length > 0 && (
          <ScrollView horizontal>
            {todo.images.map((img, i) => (
              <TouchableOpacity key={i} onPress={() => setPreviewIndex(i)}>
                <Image source={{ uri: img }} style={styles.thumb} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>

      {/* Fullscreen viewer */}
      {previewIndex !== null && (
        <Modal transparent>
          <View style={styles.previewOverlay}>
            <FlatList
              data={todo.images}
              horizontal
              pagingEnabled
              initialScrollIndex={previewIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.previewPage}
                  onPress={() => setPreviewIndex(null)}
                >
                  <Image source={{ uri: item }} style={styles.previewImage} />
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}

      {/* Edit modal */}
      <EditForm
        visible={showEdit}
        data={todo}
        onClose={() => setShowEdit(false)}
        onSubmit={(updated) => {
          saveTodo(updated);
          setShowEdit(false);
        }}
      />
      {showDeleteAlert && (
        <Modal transparent animationType="fade">
          <View style={styles.alertOverlay}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Delete this task?</Text>
              <Text style={styles.alertDesc}>
                This action cannot be undone.
              </Text>

              <View style={styles.alertActions}>
                <TouchableOpacity
                  style={styles.alertCancel}
                  onPress={() => setShowDeleteAlert(false)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.alertDelete}
                  onPress={deleteTodo}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
