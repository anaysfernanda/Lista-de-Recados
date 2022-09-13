let userList = localStorage.getItem("users");
let userListArray = JSON.parse(userList) || [];
console.log(userListArray);
const formCadastro = document.getElementById("form-cadastro");
const inputEmail = document.getElementById("input-cad-email");
const inputPassword = document.getElementById("input-cad-password");
let validPassword = false;
const inputConfirm = document.getElementById("input-confirm");
let validConfirm = false;
const icon1 = document.querySelector("#i-eye");
const icon2 = document.querySelector("#i-eye2");
const msgError = document.getElementById("msg-error-regist");

//Opção para deixar visível senha
icon1.addEventListener("click", () => {
  if (inputPassword.getAttribute("type") == "password") {
    inputPassword.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
  }
});
icon2.addEventListener("click", () => {
  if (inputConfirm.getAttribute("type") == "password") {
    inputConfirm.setAttribute("type", "text");
  } else {
    inputConfirm.setAttribute("type", "password");
  }
});

//Evento para cadastrar formulário de cadastro do usuário
formCadastro.addEventListener("submit", submitFormUser);
function submitFormUser(e) {
  e.preventDefault();

  if (validPassword && validConfirm) {
    const login = {
      email: inputEmail.value,
      password: inputPassword.value,
      passwordConfirm: inputConfirm.value,
    };

    userListArray.push(login);
    localStorage.setItem("users", JSON.stringify(userListArray));

    // localStorage.setItem(login.email.value, JSON.stringify(userListArray));

    window.location.href = "./login.html";
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<p>Preencha as senhas corretamente.</p>";
  }
}

// Validação da senha
inputPassword.addEventListener("keyup", () => {
  if (inputPassword.value.length <= 5) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<p>A senha precisa ter no mínimo 6 caracteres.</p>";
    validPassword = false;
  } else {
    msgError.setAttribute("style", "display: none");
    validPassword = true;
  }
});

// Validação da confirmação da senha
inputConfirm.addEventListener("keyup", () => {
  if (inputPassword.value != inputConfirm.value) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<p>As senhas não conferem.</p>";
    validConfirm = false;
  } else {
    msgError.setAttribute("style", "display: none");
    validConfirm = true;
  }
});
