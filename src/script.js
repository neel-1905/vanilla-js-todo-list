const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");
const addInput = document.getElementById("add-input");
const updateModal = document.getElementById("update-modal");

let todos = [
  { todoId: 1, text: "Todo 1", completed: true },
  { todoId: 2, text: "Todo 2", completed: false },
  { todoId: 3, text: "Todo 3", completed: false },
];

// Event listener for adding a new todo item
addBtn.addEventListener("click", () => {
  const text = addInput.value.trim();
  if (!text) return alert("Please enter a todo name");

  const newTodo = { todoId: Date.now(), text: text, completed: false };
  todos.push(newTodo);

  renderTodoItem(newTodo);
  addInput.value = "";
});

// Creates and appends a new todo item to the todo list
function renderTodoItem(todo) {
  const newItem = document.createElement("list-item");
  newItem.setAttribute("text", todo.text);
  newItem.setAttribute("todoId", todo.todoId);
  newItem.setAttribute("completed", todo.completed.toString());
  todoList.appendChild(newItem);
}

// Event listener for toggling todo completion status
todoList.addEventListener("toggle-completed", (e) => {
  const todoId = e.detail.todoId;
  const todo = todos.find((todo) => todo.todoId == todoId); // ✅ fix here
  if (todo) {
    console.log("updated");
    todo.completed = !todo.completed;
    rerenderAll();
  }
});

// delete-todo
todoList.addEventListener("delete-todo", (e) => {
  const todoId = e.detail.todoId;
  todos = todos.filter((todo) => todo.todoId != todoId); // ✅ fix here
  rerenderAll();
});

/**
 * Clears and re-renders all todo items in the list
 * Uses the current state of the todos array
 */
function rerenderAll() {
  todoList.innerHTML = "";
  todos.forEach(renderTodoItem);
}

/**
 * Renders all todo items from the todos array
 * Creates list-item elements for each todo and appends them to the todo list
 */
function renderTodosList() {
  todos.forEach((todo) => {
    const newItem = document.createElement("list-item");
    newItem.setAttribute("text", todo.text);
    newItem.setAttribute("todoId", todo.todoId);
    newItem.setAttribute("completed", todo.completed.toString());
    todoList.appendChild(newItem);
  });
}

// Initialize the application when the window loads
window.onload = () => {
  renderTodosList();
};

// ALL MODAL FUNCTIONALITIES
function showModal() {
  updateModal.classList.remove("hidden");
}
