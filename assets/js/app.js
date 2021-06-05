//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event listeners

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", (event) => {
	event.preventDefault();
	const value = todoInput.value;

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);

	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);

	saveLocalTodos(value);

	todoInput.value = "";
});

todoList.addEventListener("click", (event) => {
	deleteTodo(event);
});

function deleteTodo(event) {
	const item = event.target;

	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		todo.remove();
	}

	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function saveLocalTodos(todo) {
	let todos;

	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);

	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;

	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach(function (todo) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);

		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);

		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);

		todoList.appendChild(todoDiv);
	});
}
