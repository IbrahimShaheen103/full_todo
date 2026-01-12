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
    left:20,
    width:60,
    height:60,
     borderRadius: 30,
    backgroundColor: "#f01010",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  deleteAllText:{
    color:"#fff",
    fontSize:30,
  paddingBottom:4  
  }
});
