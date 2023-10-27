'use strict';

// Selectors
const formSubmit = document.getElementById('todo-form');
const formInput = document.getElementById('task-row');
const todoList = document.querySelector('.task-container');

// Todo-list
let todos = JSON.parse(localStorage.getItem('todo')) || [];

// Listeners
formSubmit.addEventListener('submit', function (e) {
	e.preventDefault();
	newTodo();
	renderTodo();
	localStorage.setItem('todo', JSON.stringify(todos));
});

todoList.addEventListener('click', function (e) {
	if (
		e.target.classList.contains('circle-color') ||
		e.target.classList.contains('check-color')
	) {
		const keyCheck = Number(e.target.parentElement.dataset.key);
		checkTodo(keyCheck);
	}

	if (e.target.classList.contains('trash-color')) {
		const keyDelete = Number(e.target.parentElement.dataset.key);
		deleteTodo(keyDelete);
	}

	if (e.target.classList.contains('edit-color')) {
		const keyEdit = Number(e.target.parentElement.dataset.key);
		editTodo(keyEdit);
	}

	if (e.target.classList.contains('save-color')) {
		const keySave = Number(e.target.parentElement.dataset.key);
		saveTodo(keySave);
	}
});

// Functions
const setTodo = (todos) => localStorage.setItem('todo', JSON.stringify(todos));

const getTodo = () => JSON.parse(localStorage.getItem('todo')) || [];

const newTodo = () => {
	const todo = {
		text: formInput.value,
		checked: false,
		id: Date.now(),
		edited: false,
	};

	if (formInput.value === '' || formInput.value.trim() === '') {
		formInput.placeholder = 'Field cannot be empty!';
		formInput.value = '';
		return;
	}

	todos.push(todo);

	formInput.value = '';
	formInput.placeholder = 'What to do?';
	setTodo(todos);
	renderTodo();
};

const html = (todos) =>
	`
	<div class="list${todos.checked ? ' task-done' : ''}" data-key="${todos.id}">
		<span class="circle" data-key="${todos.id}">
			<i class="${
				todos.checked
					? 'check-color fa-solid fa-circle-check'
					: 'circle-color fa-regular fa-circle'
			}"></i>
		</span>
		<span class="trash" data-key="${todos.id}">
			<i class="trash-color fa-solid fa-trash-can"></i>
		</span>
		<span class=${todos.checked ? 'save' : 'edit'} data-key="${todos.id}">
			<i class="${
				todos.edited
					? 'save-color fa-solid fa-check'
					: 'edit-color fa-regular fa-pen-to-square'
			}"></i>
		</span>
		<input id="todo-text" name="todo-text" type="text" data-key="${
			todos.id
		}" value="${todos.text}" ${todos.edited ? '' : 'readonly="readonly"'}" />
	</div>
	`;

const renderTodo = () => {
	todos = getTodo();
	todoList.innerHTML = '';
	todos.forEach((todos) => {
		todoList.insertAdjacentHTML('beforeend', html(todos));
	});
};

const checkTodo = (key) => {
	const indexCheck = todos.findIndex((item) => item.id === Number(key));
	todos = getTodo();
	todos[indexCheck].checked = !todos[indexCheck].checked;
	setTodo(todos);
	renderTodo();
};

const deleteTodo = (key) => {
	const indexDelete = todos.findIndex(
		(deleteItem) => deleteItem.id === Number(key)
	);
	todos = getTodo();
	todos.splice(indexDelete, 1);
	setTodo(todos);
	renderTodo();
};

const editTodo = (key) => {
	todos = getTodo();
	const indexEdit = todos.findIndex((editItem) => editItem.id === Number(key));
	todos[indexEdit].edited = !todos[indexEdit].edited;
	setTodo(todos);
	renderTodo();
	const todoEdit = document.querySelector(`input[data-key='${key}']`);
	todoEdit.focus();
	todoEdit.select();
};

const saveTodo = (key) => {
	todos = getTodo();
	const indexSave = todos.findIndex((saveItem) => saveItem.id === Number(key));
	todos[indexSave].edited = !todos[indexSave].edited;
	todos[indexSave].text = document.querySelector(
		`input[data-key='${key}']`
	).value;
	setTodo(todos);
	renderTodo();
};

renderTodo();
