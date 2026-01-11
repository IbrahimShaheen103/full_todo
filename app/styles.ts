import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },

  addBtn: {
    backgroundColor: "#4CAF50",
    width: 50,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  todoItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxDone: {
    backgroundColor: "#4CAF50",
  },

  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  todoDone: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  delete: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default styles;