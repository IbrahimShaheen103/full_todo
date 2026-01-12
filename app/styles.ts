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
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },

  addBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  filterRow: {
    flexDirection: "row",
    marginVertical: 10,
  },

  filterBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  filterBtnActive: {
    backgroundColor: "#4CAF50",
  },

  filterText: {
    fontWeight: "bold",
  },

  filterTextActive: {
    color: "#fff",
  },

  todoItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 12,
  },

  checkboxDone: {
    backgroundColor: "#4CAF50",
  },

  todoText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  todoDetails: {
    fontSize: 13,
    color: "#666",
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