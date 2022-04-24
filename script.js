var todos = [{
    title: "Do shopping",
    done: false
},
{
    title: "Go Running",
    done: false
},
{
    title: "Do your homework",
    done: true
}
];

var frmToDo = document.getElementById("frmToDo");
var ulTodos = document.getElementById("todos");
var inputTitle = document.getElementById("title");

function listAll() {

    todos = todos.sort((a,b) => a.done - b.done); // -1 çıkarsa true döner
    ulTodos.innerHTML = "";
    for (var i in todos) {
        ulTodos.innerHTML += `
        <li class="${todos[i].done ? "done" : "undone"}">
            <input type="checkbox" ${todos[i].done && "checked"} onchange="toggleStatus(${i})" />
            <span>${todos[i].title}</span>
            <a href="#" onclick="deleteToDo(${i})"><i class="fa-solid fa-xmark"></i></a>
        </li>`
    };
    save();
};

function deleteToDo(index){
    todos.splice(index,1);
    listAll();
}

function toggleStatus(index){
    todos[index].done = ! todos[index].done;
    listAll();
}

function save(){
    localStorage.data = JSON.stringify(todos);
}

function load(){
    if(localStorage.data)
        todos = JSON.parse(localStorage.data);
}

frmToDo.onsubmit = function (event) {
    event.preventDefault();
    var title = inputTitle.value;
    todos.unshift({
        title: title,
        done: false
    });
    inputTitle.value = "";
    listAll();
};

load();
listAll();