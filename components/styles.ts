import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  textarea: {
    height: 80,
    textAlignVertical: "top",
  },

  dateBtn: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  imageBtn: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  imageWrapper: {
    marginRight: 10,
    position: "relative",
    display:"flex",
    alignItems:"center"
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  removeBtn: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#ff0000",
    borderWidth: 1,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    paddingHorizontal: 6,
  },

  removeText: {
    color: "#ff0000",
    fontSize: 12,
    lineHeight: 14,
  },

  actions: {
    flexDirection: "row",
    marginTop: 15,
  },

  actionBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },

  cancelBtn: {
    backgroundColor: "#ddd",
  },

  saveBtn: {
    backgroundColor: "#4CAF50",
  },
  previewOverlay:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
  },
  previewPage: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage:{
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  }
});
