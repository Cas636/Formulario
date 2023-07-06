var x = 0;
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
  clon.firstElementChild.value = "";

  let titulito = id.previousElementSibling.textContent;
  const tit = document.createElement("h2");
  const cont = document.createTextNode(titulito);
  tit.className = "formulario__titulo";
  tit.appendChild(cont);
  clon.insertBefore(tit, clon.firstElementChild);

  nodoSiguiente.appendChild(clon);
  x = x + 1;

  const newNode = document.createElement("span");
  newNode.className = "ocultar";
  newNode.textContent = "Eliminar";
  newNode.id = x;
  newNode.onclick = function (id) {
    borrar(id);
  };

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
};
var formulario = document.getElementById("datos_form");
//let formulario = document.getElementById("datos_form");

/*
function crearXML(e) {
  const formData = new FormData(document.getElementById('datos_form'));
  const xmlDoc = document.implementation.createDocument(null, 'App');


  var encabezado1 = xmlDoc.createAttribute('xmlns:xsi');
  encabezado1.value = "http://www.w3.org/2001/XMLSchema-instance";
  var encabezado2 = xmlDoc.createAttribute('xsi:noNamespaceSchemaLocation');
  encabezado2.value = "./MicroSerFor.xsd";

  var titulo = xmlDoc.createProcessingInstruction('xml', 'version="1.0"');
  xmlDoc.insertBefore(titulo, xmlDoc.firstChild);

  const rootElement = xmlDoc.documentElement;

  var a = document.querySelectorAll("h2");
  var z = 0;

  a.forEach(element => {
    var container = xmlDoc.createElement(element.id);
    //console.log(container);
    
    formData.forEach((value, key, parent) => {
      if (z == 0) {
        console.log(parent);
        const element = xmlDoc.createElement(key);
        element.textContent = value;


        container.appendChild(element);
        rootElement.setAttributeNode(encabezado1);
        rootElement.setAttributeNode(encabezado2);


        rootElement.appendChild(container);
      }
    });
    z++;
  });
  const serializer = new XMLSerializer();
  const xmlString = serializer.serializeToString(xmlDoc);

  console.log(xmlString);
  console.log(xmlDoc);



  return xmlString;
}*/


function crearXML() {

  // Obtener el formulario y los nodos contenedores
  var nodosContenedores = document.getElementsByClassName("cl");
  var nodito = [];
  for (var i = 0; i < nodosContenedores.length; i++) {
    nodito[i] = nodosContenedores[i].id;
  }

  // Obtener las claves y valores del formulario
  var clavesValores = [];
  for (var i = 0; i < formulario.elements.length; i++) {
    var elemento = formulario.elements[i];
    if (elemento.type !== "submit") {
      clavesValores.push({
        clave: elemento.name,
        valor: elemento.value
      });
    }
  }
  // Crear un objeto XMLDocument

  var xmlDoc = document.implementation.createDocument(null, 'App');

  // Recorrer las claves y valores
  for (var i = 0; i < clavesValores.length; i++) {

    var clave = clavesValores[i].clave;
    console.log(clave);
    var valor = clavesValores[i].valor;

    // Crear un nodo para la clave
    var nodoClave = xmlDoc.createElement(clave);
    // Asignar el valor al nodo de la clave
    nodoClave.appendChild(xmlDoc.createTextNode(valor));

    if (i == 0) {
      var nodoContenedor = xmlDoc.createElement(nodito[0]);
    } else if (i == 1 || i == 2) {
      var nodoContenedor = xmlDoc.createElement(nodito[1]);
    } else if (i == 3 || i == 4) {
      var nodoContenedor = xmlDoc.createElement(nodito[2]);
    } else if (i == 5 || i == 6) {
      var nodoContenedor = xmlDoc.createElement(nodito[3]);
    } else {
      var nodoContenedor = xmlDoc.createElement(nodito[4]);
    }


    // Agregar el nodo clave al nodo contenedor
    nodoContenedor.appendChild(nodoClave);
    //console.log(nodoContenedor);

  }
  // Serializar el objeto XMLDocument a una cadena XML
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(xmlDoc);

  // Aquí puedes guardar o hacer algo con la cadena XML generada
  console.log(xmlDoc);
}





formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //const datos = crearXML(e);

  // Llamar a la función para crear el archivo XML
  const datos = crearXML();


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/xml");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: datos.textContent,
    redirect: 'follow'
  };

  fetch('http://localhost:5000/validate-xml', requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Error en la petición POST');
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

});




