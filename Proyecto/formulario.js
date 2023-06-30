window.duplicar = function duplicar() {
  console.log("si sirve");

  //   agregar.addEventListener("click", (e) => {
  //     e.preventDefault();
  let contenido = document.getElementById("contenedor");
  let clonado = document.getElementById("cl");
  console.log(clonado);
  //clonado.setAttribute("id", "cl1");
  let clon = clonado.cloneNode(true);
  contenido.appendChild(clon).classList.remove("clonar");

  let remover = contenido.lastChild.childNodes[1].querySelectorAll("span");
  remover[0].classList.remove("ocultar");
};
//.classList.remove("clonar")
// var inputs = document.getElementsByClassName("formulario__input"); //arrive varios datos en una variable
// for (var i = 0; i < inputs.length; i++) {
//   //length cuantos elementos hay
//   inputs[i].addEventListener("keyup", function () {
//     //addEventListener=escuchar un evento 'keyup' deje de teclear una tecla
//     if (this.value.length >= 1) {
//       this.nextElementSibling.classList.add("fijar");
//     } else {
//       this.nextElementSibling.classList.remove("fijar");
//     }
//   });
// }
