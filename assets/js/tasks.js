let listTask = JSON.parse(localStorage.getItem("task")) || [];
let formTask = document.getElementById("form-tasks");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const list = document.getElementById("tbody-task");

formTask.addEventListener("submit", addTask);
window.addEventListener("load", showTaskList);

function showTaskList() {
  list.innerHTML = "";
  const taskTable = generateTaskList(listTask);
  taskTable.forEach((elem) => {
    list.appendChild(elem);
  });
}

function addTask(e) {
  e.preventDefault();

  const newTask = {
    title: inputTitle.value,
    description: inputDescription.value,
  };

  listTask.push(newTask);
  localStorage.setItem("task", JSON.stringify(listTask));
  console.log(typeof listTask);
  console.log(listTask);

  showTaskList();

  inputTitle.value = "";
  inputDescription.value = "";
}

function generateTaskList(newListTask) {
  console.log(newListTask);
  return newListTask.map((element, index) => {
    const rows = document.getElementsByClassName("task-rows");
    const id = index + 1;

    const elementRow = document.createElement("tr");
    elementRow.classList = ["task-rows"];
    elementRow.id = `row-${id}`;

    const elementID = document.createElement("td");
    elementID.innerText = id;
    elementRow.appendChild(elementID);

    const elementTitle = document.createElement("td");
    elementTitle.innerText = element.title;
    elementRow.appendChild(elementTitle);

    const elementDescription = document.createElement("td");
    elementDescription.innerText = element.description;
    elementRow.appendChild(elementDescription);

    const actions = document.createElement("td");

    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Editar";

    const buttonRemove = document.createElement("button");
    buttonRemove.innerText = "Excluir";

    actions.appendChild(buttonEdit);
    actions.appendChild(buttonRemove);
    elementRow.appendChild(actions);

    return elementRow;
  });
}
