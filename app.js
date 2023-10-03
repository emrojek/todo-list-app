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
		const todoKey = e.target.parentElement.dataset.key;
		checkTodo(todoKey);
	}
});

// Functions
const newTodo = () => {
	const todo = {
		text: formInput.value,
		checked: false,
		id: Date.now(),
	};

	todos.push(todo);

	if (formInput.value === '') {
		formInput.placeholder = 'Field cannot be empty!';
		return;
	}

	const html = `
		<div class="list" data-key="${todo.id}" id="${todo.id}">
			<span class="circle"><i class="circle-color fa-regular fa-circle"></i></span>
			<span class="trash"><i class="trash-color fa-solid fa-trash-can"></i></span>
			<span class="edit"><i class="edit-color fa-regular fa-pen-to-square"></i></span>
			<span class="circle-check"><i class="check-color fa-solid fa-circle-check"></i></span>
			<span class="text">${todo.text}</span>
		</div>
	`;

	todoList.insertAdjacentHTML('beforeend', html);
	formInput.value = '';
	formInput.placeholder = 'What to do?';
};

const checkTodo = (key) => {
	const index = todos.findIndex((item) => item.id === Number(key));

	todos[index].checked = !todos[index].checked;
	console.log(todos);

	const item = document.querySelector(`[data-key='${key}']`);

	if (todos[index].checked) {
		item.classList.add('task-done');
		item.classList.remove('circle');
		item.classList.add('circle-check');

		// item.forEach((el) => el.classList.add('task-done'));
	} else {
		item.classList.remove('task-done');
	}
};
