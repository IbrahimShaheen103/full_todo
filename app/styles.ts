import { StyleSheet } from "react-native";

export default StyleSheet.create({
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

  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 10,
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

  todoDone: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  dueDate: {
    fontSize: 12,
    color: "#4CAF50",
  },

  delete: {
    fontSize: 18,
    marginLeft: 10,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  fabText: {
    color: "#fff",
    fontSize: 32,
  },
  deleteAllBtn: {
    position: "absolute",
    bottom: 30,
    left: 20,
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  deleteAllText: {
    fontSize: 30,
  },
  alertContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  alertBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },
  alertText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  alertButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alertButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#f5f5f5",
  },

  alertButtonText: {
    fontSize: 16,
    color: "#e53935",
    fontWeight: "bold",
  },
  alertButtonTextNo: {
    fontSize: 16,
    color: "#1e241e",
    fontWeight: "bold",
  },
  undo: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 100,
  },
});
