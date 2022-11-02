document.querySelector("#Start").addEventListener("click", start);
document.querySelector("#Info").addEventListener("click", informacion);

document.querySelector("#login").addEventListener("click", login_btn);
document.querySelector("#logout").addEventListener("click", log_out);

function start() {
    window.location.href = './snake.html';
    iniciar();
}

function informacion() {
  document.querySelector("#home-page").classList.remove("visible");
  document.querySelector("#Info_2").classList.add("visible");
}

document.querySelectorAll(".reiniciar").forEach(function(elemento) {
  elemento.addEventListener("click", reiniciar);
});

function reiniciar() {  
  document.location.reload();
}

document.querySelector("#home-page").classList.add("visible");

if(localStorage.getItem('user_loged')) {
  document.querySelector("#logout").classList.add("visible");
  document.querySelector("#login").classList.remove("visible");
} else {
  document.querySelector("#logout").classList.remove("visible");
  document.querySelector("#login").classList.add("visible");
}
