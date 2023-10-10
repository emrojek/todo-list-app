'use strict';

// Selectors
const formSubmit = document.getElementById('todo-form');
const formInput = document.getElementById('task-row');
const todoList = document.querySelector('.task-container');

let todos = [];

// Listeners
formSubmit.addEventListener('submit', function (e) {
	e.preventDefault();
	newTodo();
});

todoList.addEventListener('click', function (e) {
	if (e.target.classList.contains('text')) {
		const todoKey = Number(e.target.parentElement.dataset.key);
		checkTodo(todoKey);
	}

	if (e.target.classList.contains('trash-color')) {
		const todoKey = Number(e.target.parentElement.dataset.key);
		deleteTodo(todoKey);
	}
});

// Functions
const newTodo = () => {
	const todo = {
		text: formInput.value,
		checked: false,
		id: Date.now(),
	};

	if (formInput.value === '' || formInput.value.trim() === '') {
		formInput.placeholder = 'Field cannot be empty!';
		formInput.value = '';
		return;
	}

	todos.push(todo);

	const html = `
		<div class="list" data-key="${todo.id}">
			<span class="circle" data-key="${todo.id}">
				<i class="circle-color fa-regular fa-circle"></i>
			</span>
			<span class="trash" data-key="${todo.id}">
				<i class="trash-color fa-solid fa-trash-can"></i>
			</span>
			<span class="edit" data-key="${todo.id}">
				<i class="edit-color fa-regular fa-pen-to-square"></i>
			</span>
			<span class="text">${todo.text}</span>
		</div>
	`;

	todoList.insertAdjacentHTML('beforeend', html);
	formInput.value = '';
	formInput.placeholder = 'What to do?';
};

const checkTodo = (key) => {
	const index = todos.findIndex((item) => item.id === Number(key));
	const item = document.querySelector(`[data-key='${key}']`);
	const iconCheck = document.querySelector(`[data-key='${key}'] .circle`);

	todos[index].checked = !todos[index].checked;

	if (todos[index].checked) {
		item.classList.add('task-done');
		iconCheck.innerHTML =
			'<i class="check-color fa-solid fa-circle-check"></i>';
	} else {
		item.classList.remove('task-done');
		iconCheck.innerHTML = '<i class="circle-color fa-regular fa-circle"></i>';
	}
};

const deleteTodo = (key) => {
	const deleteIndex = todos.findIndex(
		(deleteItem) => deleteItem.id === Number(key)
	);
	const deleteItem = document.querySelector(`[data-key='${key}']`);
	deleteItem.remove(deleteIndex);
};
