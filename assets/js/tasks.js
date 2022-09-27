let loggedInUser = localStorage.getItem("logged");
let listTask = JSON.parse(localStorage.getItem(loggedInUser)) || [];
let formTask = document.getElementById("form-tasks");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const list = document.getElementById("tbody-task");
const msgError = document.getElementById("msg-error-task");

// Aparecer as tarefas adicionadas anteriormente
window.addEventListener("load", showTaskList);
function showTaskList() {
  list.innerHTML = ""; //Parar de duplicar tarefas;
  const taskTable = generateTaskList(listTask);
  taskTable.forEach((elem) => {
    list.appendChild(elem);
  });
}

// Adicionar tarefas
formTask.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();
  //Validação dos campos de input
  if (inputTitle.value == "" || inputDescription.value == "") {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<p>Adicione o nome da tarefa e/ou a descrição da tarefa.</p>";
  } else {
    msgError.setAttribute("style", "display: none");

    // Objeto da tarefa
    const newTask = {
      id: newId(listTask),
      title: inputTitle.value,
      description: inputDescription.value,
    };
    // Inclusão do objeto no array de tarefas
    listTask.push(newTask);
    localStorage.setItem(loggedInUser, JSON.stringify(listTask));

    showTaskList();

    inputTitle.value = "";
    inputDescription.value = "";
  }
}

// Criar linha da tabela
function generateTaskList(newListTask) {
  return newListTask.map((element) => {
    const id = element.id;

    const elementRow = document.createElement("tr");
    elementRow.id = id;

    const elementID = document.createElement("td");
    elementID.innerText = id;
    elementRow.appendChild(elementID);

    const elementTitle = document.createElement("td");
    elementTitle.innerHTML = `<input type='text' class ='iptTask' id='titleEdit${id}' value='${element.title}' disabled>`;
    elementRow.appendChild(elementTitle);

    const elementDescription = document.createElement("td");
    elementDescription.innerHTML = `<input type='text' class ='iptTask' id='descriptionEdit${id}' value='${element.description}' disabled>`;
    elementRow.appendChild(elementDescription);

    const actions = document.createElement("td");
    actions.id = "actions";
    actions.innerHTML =
      `<button id='btnEdit' class ='iptTask' onclick='editTask(${id})'>Editar</button>` +
      `<button id='btnRemove' class ='iptTask' onclick='removeTask(${id})'>Excluir</button>`;

    elementRow.appendChild(actions);

    return elementRow;
  });
}

//função para remover a tarefa;
function removeTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);

  if (listIndex < 0) {
    return;
  }
  listTask.splice(listIndex, 1);

  localStorage.setItem(loggedInUser, JSON.stringify(listTask));

  alert("Tarefa removida com sucesso!");

  showTaskList();
}

//função para gerar um id para a tarefa;
function newId(taskList) {
  let nextId = taskList.length + 1;

  let index = taskList.findIndex((value) => value.id === nextId);

  while (index >= 0) {
    nextId++;
    index = taskList.findIndex((value) => value.id === nextId);
  }
  return nextId;
}

//função pra editar a tarefa;
function editTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);
  const titleEdit = document.getElementById(`titleEdit${id}`);
  const descriptionEdit = document.getElementById(`descriptionEdit${id}`);
  const selectRow = document.getElementById(`${id}`);

  if (listIndex >= 0) {
    titleEdit.removeAttribute("disabled");
    descriptionEdit.removeAttribute("disabled");
    titleEdit.addEventListener("blur", (e) => {
      executTest(e, id);
    });
    descriptionEdit.addEventListener("blur", (e) => {
      executTest(e, id);
    });
  }
}

//função pra executar o algoritmo para cada evento de "blur";
function executTest(e, id = null) {
  const titleEdit = document.getElementById(`titleEdit${id}`);
  const descriptionEdit = document.getElementById(`descriptionEdit${id}`);
  e.target.setAttribute("disabled", false);
  const newListTask = listTask.map((task) => {
    if (task.id === id) {
      task.title = titleEdit.value;
      task.description = descriptionEdit.value;
      return task;
    } else {
      return task;
    }
  });

  localStorage.setItem(loggedInUser, JSON.stringify(newListTask));
}

// Função para sair da página de tarefas;
function logout() {
  const confirmed = confirm("Deseja sair?");
  if (confirmed) {
    window.location.href = "./login.html";
  } else {
    window.location.href = "./tasks.html";
  }
}
