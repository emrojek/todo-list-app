'use strict';

const btnAdd = document.querySelector('.btn-task');
const inputField = document.getElementById('task-row');
const taskList = document.getElementById('task-container');

// Functions
const addElement = function () {
	if (inputField.value === '') {
		inputField.placeholder = 'Write some text first!';
	} else {
		const newLi = document.createElement('li');
		document.getElementById('task-container').appendChild(newLi);
		newLi.innerHTML = `
			<span>${inputField.value}</span>
		`;
	}
	inputField.value = '';
};

// Event listeners
btnAdd.addEventListener('click', addElement);
