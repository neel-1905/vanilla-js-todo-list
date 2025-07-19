class ListItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const text = this.getAttribute("text") || this.textContent;
    const id = Number(this.getAttribute("todoId"));
    const completed = this.getAttribute("completed");

    const isCompleted = completed === "true";

    this.innerHTML = `
  <li>
    <div class="list-item">
      <div class="flex gap-3 items-center">
        <input type="checkbox" class="complete-checkbox" ${
          isCompleted ? "checked" : ""
        } />
        <p class="${isCompleted ? "line-through" : ""}">${text}</p>
      </div>
      <div>
        <button id="update-btn" class="border-none bg-blue-500 action-btn">Update</button>
        <button id="delete-btn" class="border-none bg-red-500 action-btn">Delete</button>
      </div>
    </div>
  </li>
`;

    const updateBtn = this.querySelector("#update-btn");
    const deleteBtn = this.querySelector("#delete-btn");
    const completedCheckbox = this.querySelector(".complete-checkbox");

    updateBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("edit-todo", {
          bubbles: true,
          detail: { id, currentText: text },
        })
      );
    });

    // checkbox toggle
    completedCheckbox.addEventListener("change", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-completed", {
          bubbles: true,
          detail: { todoId: id },
        })
      );
    });

    // delete button
    deleteBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-todo", {
          bubbles: true,
          detail: { todoId: id },
        })
      );
    });
  }
}

customElements.define("list-item", ListItem);
