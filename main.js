//Selectors
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();

    //create div class=Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //create check button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //create trash button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append todolist
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //delete button todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //ainimation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
        // todo.remove();
    }

    //check button
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('uncompleted')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    //check 
    let todos;
    if(localStorage.getItem('todos')  === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //check
    let todos;
    if(localStorage.getItem('todos')  === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
    //create div class=Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //create check button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //create trash button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
 
    //append todolist
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem('todos')  === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}