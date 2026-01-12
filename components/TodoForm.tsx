import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    details: string;
    images: string[];
    dueDate: Date | null;
  }) => void;
};

export default function TodoForm({ visible, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };
  const handleOnClose = () => {
    setTitle("");
    setDetails("");
    setImages([]);
    setDueDate(null);
    setPreviewIndex(null);
    onClose();
  };
  const submit = () => {
    if (!title.trim()) return;

    onSubmit({ title, details, images, dueDate });

    setTitle("");
    setDetails("");
    setImages([]);
    setDueDate(null);
    setPreviewIndex(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>New Todo</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.input}
          />

          <TextInput
            value={details}
            onChangeText={setDetails}
            placeholder="Details"
            style={[styles.input, styles.textarea]}
            multiline
          />

          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowPicker(true)}
          >
            <Text>
              {dueDate ? `Due: ${dueDate.toDateString()}` : "Pick due date"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              onChange={(e, date) => {
                setShowPicker(false);
                if (date) setDueDate(date);
              }}
            />
          )}

          <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
            <Text>📎 Add Images ({images.length})</Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <FlatList
              data={images}
              horizontal
              keyExtractor={(i) => i}
              renderItem={({ item, index }) => (
                <View style={styles.imageWrapper}>
                  <TouchableOpacity onPress={() => setPreviewIndex(index)}>
                    <Image source={{ uri: item }} style={styles.image} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() =>
                      setImages((prev) => prev.filter((img) => img !== item))
                    }
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={handleOnClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.saveBtn]}
              onPress={submit}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {previewIndex !== null && (
          <Modal visible transparent animationType="fade">
            <View style={styles.previewOverlay}>
              <FlatList
                data={images}
                horizontal
                pagingEnabled
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get("window").width,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setPreviewIndex(null)}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: "100%",
                        height: "70%",
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
}
