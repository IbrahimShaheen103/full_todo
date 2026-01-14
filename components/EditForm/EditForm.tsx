import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./../styles";

type Todo = {
  id: string;
  title: string;
  details: string;
  done: boolean;
  dueDate: string | null;
  images: string[];
};

type Props = {
  visible: boolean;
  data: Todo;
  onClose: () => void;
  onSubmit: (data: Todo) => void;
};

export default function EditForm({ visible, onClose, onSubmit, data }: Props) {
  const [title, setTitle] = useState(data.title);
  const [details, setDetails] = useState(data.details);
  const [images, setImages] = useState<string[]>(data.images);
  const [dueDate, setDueDate] = useState<string | null>(data.dueDate);
  const [showPicker, setShowPicker] = useState(false);

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    setTitle(data.title);
    setDetails(data.details);
    setImages(data.images);
    setDueDate(data.dueDate);
  }, [data]);

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
  const openDiscardAlert = () => {
    setShowAlert(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
  };

  const handleCancel = () => {
    if (
      title !== data.title ||
      details !== data.details ||
      dueDate !== data.dueDate ||
      images.toString() !== data.images.toString()
    ) {
      // There are unsaved changes
      openDiscardAlert();
    } else {
      onClose();
    }
  };
  const confirmDiscard = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

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
    ]).start(() => {
      setShowAlert(false);
      setTitle(data.title);
      setDetails(data.details);
      setDueDate(data.dueDate);
      setImages(data.images);
      onClose();
    });
  };
  const submit = () => {
    onSubmit({
      ...data,
      title: title.trim(),
      details,
      images,
      dueDate,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>Edit Todo</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            value={details}
            onChangeText={setDetails}
            style={[styles.input, styles.textarea]}
            multiline
          />

          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowPicker(true)}
          >
            <Text>
              {dueDate ? new Date(dueDate).toDateString() : "Pick due date"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dueDate ? new Date(dueDate) : new Date()}
              mode="date"
              onChange={(e, date) => {
                setShowPicker(false);
                if (date) setDueDate(date.toISOString());
              }}
            />
          )}

          <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
            <Text>📎 Edit Images</Text>
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
                    onPress={() => {
                      setImages((prev) => prev.filter((img) => img !== item));
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
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
              onPress={handleCancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionBtn,
                styles.saveBtn,
                !title.trim() && styles.saveBtnDisabled,
              ]}
              onPress={submit}
              disabled={!title.trim()}
            >
              <Text
                style={[
                  { color: "#fff" },
                  !title.trim() && styles.saveTextDisabled,
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showAlert && (
          <Animated.View style={[styles.alertContainer, { opacity: fadeAnim }]}>
            <Animated.View
              style={[styles.alertBox, { transform: [{ scale: scaleAnim }] }]}
            >
              <Text style={styles.alertText}>Discard Changes?</Text>
              <View style={styles.alertButtons}>
                <TouchableOpacity
                  style={styles.alertButton}
                  onPress={() => {
                    setShowAlert(false);
                  }}
                >
                  <Text style={styles.alertButtonText}>Keep Editing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.alertButton}
                  onPress={confirmDiscard}
                >
                  <Text style={styles.alertButtonTextNo}>Discard</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}
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
