let listTask = JSON.parse(localStorage.getItem("tasks")) || [];
let formTask = document.getElementById("form-tasks");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const list = document.getElementById("tbody-task");

// [{user: 'ana@ana.com', tasks: [{"title":"Testando","description":"Teste 123..."},{"title":"Teste 123","description":"Testando"}]}]

// let userTaskList = listTask.find((value) => {
//     value.user = 'ana@ana.com'
// })

// Aparecer as tarefas adicionadas anteriormente
window.addEventListener("load", showTaskList);
function showTaskList() {
  list.innerHTML = "";
  const taskTable = generateTaskList(listTask);
  taskTable.forEach((elem) => {
    list.appendChild(elem);
  });
}

// Adicionar tarefas
formTask.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();

  const newTask = {
    id: newId(listTask),
    title: inputTitle.value,
    description: inputDescription.value,
  };
  console.log(`Id da task ${newId.id}`);

  listTask.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(listTask));
  console.log(typeof listTask);
  console.log(listTask);

  showTaskList();

  inputTitle.value = "";
  inputDescription.value = "";
}

// Criar linha da tabela
function generateTaskList(newListTask) {
  console.log(newListTask);
  return newListTask.map((element, index) => {
    const rows = document.getElementsByClassName("task-rows");
    const id = index + 1;

    const elementRow = document.createElement("tr");
    elementRow.classList = ["task-rows"];
    elementRow.id = id;

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
    actions.id = "actions";

    const buttonEdit = document.createElement("button");
    // buttonEdit.classList = ["btnEdit"];
    // buttonEdit.innerText = "Editar";
    buttonEdit.innerHTML = `<button class='btnEdit' onclick='editTask(${id})'>Editar</button>`;

    const buttonRemove = document.createElement("button");
    // buttonRemove.classList = ["btnRemove"];
    // buttonRemove.innerText = "Excluir";
    buttonRemove.innerHTML = `<button class='btnRemove' onclick='removeTask(${id})'>Excluir</button>`;

    actions.appendChild(buttonEdit);
    actions.appendChild(buttonRemove);
    elementRow.appendChild(actions);

    return elementRow;
  });
}

function removeTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);

  if (listIndex < 0) {
    return;
  }
  listTask.splice(listIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(listTask));

  alert("Produto removido com sucesso!");

  showTaskList();
}

function newId(taskList) {
  let nextId = taskList.length + 1;

  let index = taskList.findIndex((value) => value.id === nextId);

  while (index >= 0) {
    nextId++;
    index = taskList.findIndex((value) => value.id === nextId);
  }
  return nextId;
}

function editTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);

  if (listIndex >= 0) {
    localStorage.setItem("tasks", JSON.stringify(listTask));
  }
}
