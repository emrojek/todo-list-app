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
			<span class="save" data-key="${todo.id}">
				<i class="save-color fa-solid fa-check"></i>
			</span>
			<input id="todo-text" name="todo-text" type="text" data-key="${todo.id}" value="${todo.text}" readonly />
		</div>
	`;

	todoList.insertAdjacentHTML('beforeend', html);
	formInput.value = '';
	formInput.placeholder = 'What to do?';
};

const checkTodo = (key) => {
	const indexCheck = todos.findIndex((item) => item.id === Number(key));
	const item = document.querySelector(`[data-key='${key}']`);
	const iconCheck = document.querySelector(`span[data-key='${key}']`);

	todos[indexCheck].checked = !todos[indexCheck].checked;

	if (todos[indexCheck].checked) {
		item.classList.add('task-done');
		iconCheck.innerHTML =
			'<i class="check-color fa-solid fa-circle-check"></i>';
	} else {
		item.classList.remove('task-done');
		iconCheck.innerHTML = '<i class="circle-color fa-regular fa-circle"></i>';
	}
};

const deleteTodo = (key) => {
	const indexDelete = todos.findIndex(
		(deleteItem) => deleteItem.id === Number(key)
	);
	const deleteItem = document.querySelector(`[data-key='${key}']`);
	deleteItem.remove(indexDelete);
};

const editTodo = (key) => {
	const todoEdit = document.querySelector(`input[data-key='${key}']`);
	const editBtn = document.querySelector(`.edit[data-key='${key}']`);
	const saveBtn = document.querySelector(`.save[data-key='${key}']`);
	editBtn.style.visibility = 'hidden';
	saveBtn.style.visibility = 'visible';
	todoEdit.removeAttribute('readonly');
	todoEdit.select();
	todoEdit.focus();
};

const saveTodo = (key) => {
	const todoSave = document.querySelector(`input[data-key='${key}']`);
	const editBtn = document.querySelector(`.edit[data-key='${key}']`);
	const saveBtn = document.querySelector(`.save[data-key='${key}']`);
	editBtn.style.visibility = 'visible';
	saveBtn.style.visibility = 'hidden';
	todoSave.setAttribute('readonly', 'readonly');
	todoSave.blur();
};
