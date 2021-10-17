var output = document.getElementById("div1");

var tasks = [];
var listId = Date.now();

let stringyData = localStorage.getItem("task");
if (stringyData) {
    tasks = JSON.parse(stringyData);
}

function pushTaskOnUi(tasks) {
    var ul = document.getElementById("list");
    ul.innerText = "";
    tasks.forEach(function (value) {
        addTask(value);
    })
}
pushTaskOnUi(tasks);

var input = document.getElementById("input");
input.addEventListener("keyup", function (events) {
    if (events.keyCode === 13) {
        var task = input.value;
        if (!task.trim().length) {
            var div3 = document.getElementById("div2");
            var error = document.createElement("p");
            error.setAttribute("class", "error");
            error.innerHTML = "Oops! Please input valid task!!";
            div3.appendChild(error);
            setTimeout(function () {
                error.remove();
            }, 1000)
            input.value = "";
            return;
        }
        else {
            let newId = listId;
            var todo = {
                name: task,
                id: newId,
                isCompleted: false
            }
            tasks.push(todo);
            addTaskToLocalStorage(tasks);
            input.value = "";
            ++listId;
        }
    }
})

function addTaskToLocalStorage(tasks) {
    let stringyForm = JSON.stringify(tasks);
    localStorage.setItem("task", stringyForm);
    pushTaskOnUi(tasks);
}

function addTask(value) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute("id", `li${value.id}`);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "check");
    checkbox.checked = value.isCompleted;


    var textNode = document.createTextNode(value.name);

    var label = document.createElement("label");
    label.setAttribute("id",value.id);
    label.appendChild(textNode);

    var edtButton = document.createElement("button");//Button
    edtButton.setAttribute("type","checkbox");//checkbox
    
    edtButton.setAttribute("class", "edtbtn");
    edtButton.innerHTML = "✏️";
    edtButton.addEventListener("click", function(){
        editTask(value);
    })

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.setAttribute("class", "dltButton");
    deleteButton.addEventListener("click", function () {
        deleteTask(value.id);
    });

    checkbox.addEventListener("change", function () {
        checkStatus(value.id);
    })
    li.appendChild(deleteButton);
    li.appendChild(edtButton);
    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);

    var hrLine = document.createElement("hr");
    ul.appendChild(hrLine);
}
function checkStatus(id) {
    tasks.forEach(function (value) {
        if (value.id === id)
            value.isCompleted = !value.isCompleted;
    })
    addTaskToLocalStorage(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(function (value) {
        return value.id !== id;
    })
    addTaskToLocalStorage(tasks);
}

function editTask(value) {
    var div3 = document.getElementById("div2");

    var input = document.createElement("input");
    input.setAttribute("id","edit");
    input.setAttribute("type","text");
    input.setAttribute("placeholder", "Edit task ...");

    div3.appendChild(input);

    input.addEventListener("keyup", function (events) {
        if (events.keyCode===13) {
            var task = input.value;
            if (!task.trim().length) {
                var div3 = document.getElementById("div2");
                var error = document.createElement("p");
                error.setAttribute("class", "error");
                error.innerHTML = "Oops! Please input valid task!!";
                div3.appendChild(error);
                setTimeout(function () {
                    error.remove();
                }, 1000)
                input.value = "";
                return;
            }
            else {
            tasks.forEach(function (val) {
                if(val.id === value.id)
                value.name = task;
            })
            addTaskToLocalStorage(tasks);
            input.remove();
            }
        }
    }
)}
