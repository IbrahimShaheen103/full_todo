import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  back: { fontSize: 24 },
  edit: { fontSize: 20 },
  headerTitle: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "bold", padding: 20 },
  date: { marginLeft: 20, color: "gray" },
  details: { padding: 20, fontSize: 16, lineHeight: 22 },
  thumb: { width: 100, height: 100, borderRadius: 10, marginLeft: 20 },
  doneBtn: {
    marginLeft: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  doneActive: {
    backgroundColor: "#C8E6C9",
  },
  doneText: {
    fontWeight: "600",
  },
  previewOverlay: { flex: 1, backgroundColor: "black" },
  previewPage: { width, justifyContent: "center", alignItems: "center" },
  previewImage: { width: "100%", height: "70%", resizeMode: "contain" },
  deleteBtn: {
    marginLeft: 20,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffebee",
    alignSelf: "flex-start",
  },

  deleteText: {
    color: "#d32f2f",
    fontWeight: "600",
  },

  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  alertDesc: {
    color: "gray",
    marginBottom: 20,
  },

  alertActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  alertCancel: {
    padding: 12,
    marginRight: 10,
  },

  alertDelete: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#d32f2f",
  },
});
export default styles;
