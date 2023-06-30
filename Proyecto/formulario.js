var x = 0;
var a = 101;
window.duplicar = function duplicar(id) {
  let contador = 0;

  // Bucle para buscar el segundo hermano siguiente
  let nodoSiguiente = id.nextElementSibling;
  while (nodoSiguiente) {
    contador++;
    if (contador === 2) {
      // Se encontró el segundo hermano siguiente
      break;
    }
    nodoSiguiente = nodoSiguiente.nextElementSibling;
  }
  let clonado = id.nextElementSibling;
  let clon = clonado.cloneNode(true);
  nodoSiguiente.appendChild(clon);


  const tit = document.createElement("h1");
  const cont = document.createTextNode("titulito");
  tit.className = "formulario__titulo";
  tit.appendChild(cont);



  nodoSiguiente.firstElementChild.insertBefore(tit, null);
  console.log(nodoSiguiente.firstElementChild.id);
  //console.log(getElementById(a));
  a = a + 1;
  x = x + 1;

  const newNode = document.createElement("span");
  newNode.className = "ocultar";
  newNode.textContent = "Eliminar";
  newNode.id = x;
  newNode.onclick = function (id) { borrar(id) };

  nodoSiguiente.insertBefore(newNode, null);

};


window.borrar = function borrar(id) {
  let contenedor = id.target;
  contenedor.previousSibling.remove();
  contenedor.remove();
};


var inputs = document.getElementsByClassName("formulario__input"); //arrive varios datos en una variable
for (var i = 0; i < inputs.length; i++) {
  //length cuantos elementos hay
  inputs[i].addEventListener("keyup", function () {
    //addEventListener=escuchar un evento 'keyup' deje de teclear una tecla
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add("fijar");
    } else {
      this.nextElementSibling.classList.remove("fijar");
    }
  });
}

let formulario = document.getElementById('datos_form');

const procesar = (event) => {
  event.preventDefault();
  const datos = new FormData(event.target);
  console.log(event.target);
  const datosCompl = Object.fromEntries(datos.entries());
  console.log(datosCompl);
  console.log(JSON.stringify(datosCompl));

}

formulario.addEventListener('submit',procesar);



formulario.addEventListener('submit', e =>{
  e.preventDefault();
  let datos = new FormData(formulario);
  peticion ={
    method:'POST',
    body:datos,
  }
  fetch('php/datoss.php',peticion)
  .then(respuesta => respuesta.json)
  .then(respuesta => {

  }).catch(error => console.log('error',error));
});