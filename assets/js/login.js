const formLogin = document.getElementById("form-login");
const userPassword = document.getElementById("input-password");
const userEmail = document.getElementById("input-email");
const icon = document.querySelector("#i-eye");
const msgError = document.getElementById("msg-error-login");

//Opção para deixar visível senha
icon.addEventListener("click", () => {
  if (userPassword.getAttribute("type") == "password") {
    userPassword.setAttribute("type", "text");
  } else {
    userPassword.setAttribute("type", "password");
  }
});

//Evento para autenticação do login
formLogin.addEventListener("submit", doLogin);
function doLogin(e) {
  e.preventDefault();
  let accountList = JSON.parse(localStorage.getItem("users"));

  const validation = {
    emailLogin: "",
    passwordLogin: "",
  };

  for (item of accountList) {
    if (
      userEmail.value === item.email &&
      userPassword.value === item.password
    ) {
      validation.emailLogin = item.email;
      validation.passwordLogin = item.password;
    }
  }

  console.log(validation);
  if (
    userEmail.value === validation.emailLogin &&
    userPassword.value === validation.passwordLogin
  ) {
    window.location.href = "./tasks.html";
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<p>Usuário e/ou senha incorretos.</p>";
  }
}