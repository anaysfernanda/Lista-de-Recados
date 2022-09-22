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

  listTask.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(listTask));

  showTaskList();

  inputTitle.value = "";
  inputDescription.value = "";
}

// Criar linha da tabela
function generateTaskList(newListTask) {
  console.log(newListTask);
  return newListTask.map((element, index) => {
    const rows = document.getElementsByClassName("task-rows");
    const id = element.id;

    const elementRow = document.createElement("tr");
    elementRow.classList = ["task-rows"];
    elementRow.id = id;

    const elementID = document.createElement("td");
    elementID.innerText = id;
    elementRow.appendChild(elementID);

    const elementTitle = document.createElement("td");
    // elementTitle.innerText = element.title;
    elementTitle.innerHTML = `<input type='text' id='titleEdit${id}' value='${element.title}' disabled>`;
    elementRow.appendChild(elementTitle);

    const elementDescription = document.createElement("td");
    elementDescription.innerText = element.description;
    elementDescription.innerHTML = `<input type='text' id='descriptionEdit${id}' value='${element.description}' disabled>`;
    elementRow.appendChild(elementDescription);

    const actions = document.createElement("td");
    actions.id = "actions";

    const buttonEdit = document.createElement("button");
    // buttonEdit.classList = ["btnEdit"];
    // buttonEdit.innerText = "Editar";
    buttonEdit.innerHTML = `<button id='btnEdit' onclick='editTask(${id})'>Editar</button>`;

    const buttonRemove = document.createElement("button");
    // buttonRemove.classList = ["btnRemove"];
    // buttonRemove.innerText = "Excluir";
    buttonRemove.innerHTML = `<button id='btnRemove' onclick='removeTask(${id})'>Excluir</button>`;

    actions.appendChild(buttonEdit);
    actions.appendChild(buttonRemove);
    elementRow.appendChild(actions);

    return elementRow;
  });
}

function removeTask(id) {
  console.log(`Id da task ${id}`);
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
  console.log(listIndex);
  const titleEdit = document.getElementById(`titleEdit${id}`);
  const descriptionEdit = document.getElementById(`descriptionEdit${id}`);

  if (listIndex >= 0) {
    alert("selecionou!");
    titleEdit.removeAttribute("disabled");
    descriptionEdit.removeAttribute("disabled");
    titleEdit.addEventListener("blur", (e) => {
      e.target.setAttribute("disabled", false);
    });
    descriptionEdit.addEventListener("blur", (e) => {
      e.target.setAttribute("disabled", false);
    });
  }
}
