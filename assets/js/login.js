const buttonLogin = document.getElementById("button-login");
const arrow = document.getElementById("arrow");
const formLogin = document.getElementById("form-login");
const userPassword = document.getElementById("input-password");
const userEmail = document.getElementById("input-email");
const icon = document.querySelector("#i-eye");
const containerAlert = document.getElementById("container-alert");

buttonLogin.addEventListener("mouseover", () => {
  arrow.style.animation = "arrow 0.7s infinite";
});

buttonLogin.addEventListener("mouseleave", () => {
  arrow.style.animation = "none";
});

if (icon) {
  icon.addEventListener("click", () => {
    if (userPassword.getAttribute("type") == "password") {
      userPassword.setAttribute("type", "text");
    } else {
      userPassword.setAttribute("type", "password");
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

formLogin.addEventListener("submit", doLogin);
function doLogin(e) {
  e.preventDefault();
  let accountList = JSON.parse(localStorage.getItem("users")) || [];

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

  if (
    userEmail.value === validation.emailLogin &&
    userPassword.value === validation.passwordLogin
  ) {
    localStorage.setItem("logged", userEmail.value);
    window.location.href = "./tasks.html";
  } else {
    myAlert(
      "Usuário e/ou senha incorretos. Você ainda não tem cadastro? Cadastre-se abaixo.",
      "danger"
    );
    userEmail.value = "";
    userPassword.value = "";
    userEmail.focus();
  }
}
