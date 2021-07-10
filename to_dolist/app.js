//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-List');
const filterOption=document.querySelector(".filter-todo");





//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo);




//functions
function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newToDo=document.createElement('li');
    newToDo.innerText=todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    saveLocalTodos(todoInput.value);

    const completedButton =document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton=document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function deletecheck(e){
    const item = e.target;
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        todo.classList.add('fall');
        removeLocaltodos(todo);
        todo.addEventListener('transitioned',function(){
            todo.remove();
        })
    }
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";   
                }
                else{
                    todo.style.display="none";
                }
                break;
        }
    })
}
function saveLocalTodos(todo){
   let todos;
   if(localStorage.getItem('todos')==null){
       todos=[];
   }else{
       todos=JSON.parse(localStorage.getItem("todos"));
   } 
   todos.push(todo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newToDo=document.createElement('li');
        newToDo.innerText=todo;
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);
        const completedButton =document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton=document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}