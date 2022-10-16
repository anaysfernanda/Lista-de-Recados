const buttonLogin = document.getElementById("button-cad-login");
const arrow = document.getElementById("arrow2");
let userList = localStorage.getItem("users");
let userListArray = JSON.parse(userList) || [];
const formCadastro = document.getElementById("form-cadastro");
const inputEmail = document.getElementById("input-cad-email");
const inputPassword = document.getElementById("input-cad-password");
const inputConfirm = document.getElementById("input-confirm");
const icon1 = document.querySelector("#i-eye");
const icon2 = document.querySelector("#i-eye2");
const containerAlert = document.getElementById("container-alert");
const msgError = document.getElementById("msg-error-regist");
const bsAlert = new bootstrap.Alert("#myAlert");
let validPassword = false;
let validConfirm = false;

formCadastro.addEventListener("submit", submitFormUser);
function submitFormUser(e) {
  e.preventDefault();

  if (validPassword && validConfirm) {
    const login = {
      email: inputEmail.value,
      password: inputPassword.value,
      passwordConfirm: inputConfirm.value,
    };

    if (!isEmailValid(login.email)) return;

    userListArray.push(login);
    localStorage.setItem("users", JSON.stringify(userListArray));

    window.location.href = "./login.html";
  } else {
    myAlert("Preencha as senhas corretamente.", "danger");
  }
}

buttonLogin.addEventListener("mouseover", () => {
  arrow.style.animation = "rotate 4s ease-in-out infinite";
});

buttonLogin.addEventListener("mouseleave", () => {
  arrow.style.animation = "none";
});

if (icon1) {
  icon1.addEventListener("click", () => {
    if (inputPassword.getAttribute("type") == "password") {
      inputPassword.setAttribute("type", "text");
    } else {
      inputPassword.setAttribute("type", "password");
    }
  });
}

if (icon2) {
  icon2.addEventListener("click", () => {
    if (inputConfirm.getAttribute("type") == "password") {
      inputConfirm.setAttribute("type", "text");
    } else {
      inputConfirm.setAttribute("type", "password");
    }
  });
}

const myAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert-danger alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  containerAlert.append(wrapper);
};

buttonLogin.addEventListener("click", () => {
  if (inputPassword.value.length <= 5) {
    myAlert("A senha precisa ter no mínimo 6 caracteres.", "danger");
    validPassword = false;
  } else {
    validPassword = true;
  }
});

buttonLogin.addEventListener("click", () => {
  if (inputPassword.value != inputConfirm.value) {
    myAlert("As senhas não conferem.", "danger");
    validConfirm = false;
  } else {
    validConfirm = true;
  }
});

function isEmailValid(email) {
  if (userListArray.some((user) => email === user.email)) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<p>E-mail já cadastrado. </br><a href='./login.html'>Clique aqui e faça o login</a> ou cadastre novo e-mail</p>";
    inputEmail.focus();
    return false;
  }
  return true;
}
