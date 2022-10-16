let loggedInUser = localStorage.getItem("logged");
let listTask = JSON.parse(localStorage.getItem(loggedInUser)) || [];
let formTask = document.getElementById("form-tasks");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const list = document.getElementById("tbody-task");
const msgError = document.getElementById("msg-error-task");
const iconAdd = document.getElementById("icon-add");
const btnAdd = document.getElementById("button-add-task");
const accordion = document.getElementById("accordion-list");
const modalDelete = new bootstrap.Modal("#modalDelete");
const modalEdit = new bootstrap.Modal("#modalEdit");
const btnDelete = document.getElementById("btnDelete");
const btnEdit = document.getElementById("btnEdit");
const editTitle = document.getElementById("recipient-name");
const editDescription = document.getElementById("message-text");

btnAdd.addEventListener("mouseover", () => {
  iconAdd.style.animation = "rotate 1s ease-in-out";
});

btnAdd.addEventListener("mouseleave", () => {
  iconAdd.style.animation = "none";
});

window.addEventListener("load", showTaskList);
function showTaskList() {
  accordion.innerHTML = ""; //Parar de duplicar tarefas;
  accordion.innerHTML = generateTaskList(listTask);
}

formTask.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();
  if (inputTitle.value == "" || inputDescription.value == "") {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<p>Adicione o nome da tarefa e/ou a descrição da tarefa.</p>";
  } else {
    msgError.setAttribute("style", "display: none");

    const newTask = {
      id: newId(listTask),
      title: inputTitle.value,
      description: inputDescription.value,
    };

    listTask.push(newTask);
    localStorage.setItem(loggedInUser, JSON.stringify(listTask));

    showTaskList();

    inputTitle.value = "";
    inputDescription.value = "";
  }
}

function generateTaskList(newListTask) {
  let addHtml = "";
  newListTask.forEach((element) => {
    let addAccordion = `<div class="accordion-item">
    <h2 class="accordion-header" id="accordion-${element.id}">
      <button
        class="accordion-button collapsed font-size"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-accordion-${element.id}"
        aria-expanded="false"
        aria-controls="collapseTwo"
      >
      #${element.id}<span class="ms-3">${element.title}</span>
      </button>
    </h2>
    <div
      id="collapse-accordion-${element.id}"
      class="accordion-collapse collapse"
      aria-labelledby="accordion-${element.id}"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body d-flex">
        <div class="flex-grow-1 font-size me-2">${element.description}</div> 
        <button class ='me-2 btn font-size btn-primary' onclick='showModalEdit(${element.id})'>Editar</button>
        <button class="btn btn-danger font-size"
        onclick = 'showModalDelete(${element.id})'
        >Excluir</button>
      </div>
    </div>
  </div>`;

    addHtml += addAccordion;
  });
  return addHtml;
}

function showModalDelete(id) {
  modalDelete.show();
  btnDelete.addEventListener("click", () => deleteTask(id));
}

function deleteTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);

  if (listIndex < 0) {
    return;
  }
  listTask.splice(listIndex, 1);

  localStorage.setItem(loggedInUser, JSON.stringify(listTask));

  showTaskList();
  modalDelete.hide();
}

function showModalEdit(id) {
  modalEdit.show();
  let idEdit = listTask.find((data) => data.id === id);
  editTitle.value = idEdit.title;
  editDescription.value = idEdit.description;
  btnEdit.addEventListener("click", () => editTask(id));
}

function editTask(id) {
  const listIndex = listTask.findIndex((value) => value.id === id);
  if (listIndex >= 0) {
    const newListTask = listTask.map((task) => {
      if (task.id === id) {
        task.title = editTitle.value;
        task.description = editDescription.value;
        return task;
      } else {
        return task;
      }
    });

    localStorage.setItem(loggedInUser, JSON.stringify(newListTask));
  }
  showTaskList();
  modalEdit.hide();
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

function logout() {
  const confirmed = confirm("Deseja sair?");
  if (confirmed) {
    window.location.href = "./login.html";
  } else {
    window.location.href = "./tasks.html";
  }
}
