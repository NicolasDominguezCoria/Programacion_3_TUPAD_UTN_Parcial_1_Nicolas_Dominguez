// 1 - IMPORTAMOS EL TIPO Y FUNCIONES NECESARIOS 

import { type IcartItem } from "../../../types/product";
import { clearCart, getCart, saveCart } from "../../../utils/cart";

// =================================================================

// 2 - CAPTURAMOS LOS CONTENEDORES DEL HTML 

// captura el contenedor izquierdo donde se insertaran los productos que estan en el local storage.
const CajaCarrito = document.getElementById("contenedor_productos") as HTMLDivElement;

// captura el contenedor derecho donde se mostrará el resumen final
const cajaResumen = document.querySelector(".resumen_total") as HTMLDivElement;

// Captura el boton "FINALIZAR COMPRA"
const btnFinalizar = document.querySelector(".btn--finalizar" ) as HTMLButtonElement;
btnFinalizar.disabled = true; //lo dejamos inhabilitado por defecto

// Captura el boton "VACIAR CARRITO" que permitirá borrar todos los items y vaciar por completo el carrito
const btnVaciar = document.querySelector(".btn-vaciar") as HTMLButtonElement;


// =================================================================

// 3 - CREAMOS LA FUNCION QUE PERMITE MOSTRAR EL PRECIO TOTAL EN SU CONTENEDOR 

// Variable que contienen el monto inicial del precio total del carrito (por defecto 0).
let precioTotal = 0;

// Funcion que inserta y muestra en el contenedor el precio total.
function mostrarTotal() {
  cajaResumen.innerHTML = `<strong>TOTAL: $ ${precioTotal}</strong>`;
}

// =================================================================

// 4 - CONSULTAMOS Y OBTENEMOS DATOS DEL LOCALSTORAGE

// Ejecuta getCart() y aloja los datos devueltos por este.
const productosEnCarrito: IcartItem[] = getCart();

// 5 - CREAMOS LA FUNCION QUE PERMITE VISUALIZAR LOS PRODUCTOS DEL LOCAL STORAGE

function cargarItems() { productosEnCarrito.forEach((producto) => {
  
  // A - CREACIÓN DE LOS ARTICULOS DEL CARRITO
  // crea el elemento que servirá de molde para el item
    const article = document.createElement("article");
    article.classList.add("product-card");
    
    // comprueba si el producto contiene su categoria
    const categoriaNombre = producto.categorias && producto.categorias.length > 0 ?
     producto.categorias[0].nombre: "Sin categoría";

    // Variable auxiliar llevar la cuenta de la cantidad de un producto
    let cantidad: number = producto.cantidad || 1; //si por alguna razón la cantidad de unidades no se guardó en el item, por defecto se otorga 1
    
    // Construye el item con la información del producto
    // que tendrá la informacion del producto, un contador donde se podrá aumentar o disminuir la cantidad de un producto
    // y un botón para eliminar un producto del carrito
    article.innerHTML = `
      <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
      <div class="product_detalle">
        <p class="categoria-item">Categoría: ${categoriaNombre}</p>
        <h3>${producto.nombre}</h3>
        <p class="precio-item">Precio: <strong>$ ${producto.precio}</strong></p>
      </div>
      
      <div class="quantity-selector">
        <button class="btn-restar">-</button>
        <span class="quantity-selector-txt">${cantidad}</span>
        <button class="btn-sumar">+</button>
      </div>
      <div>
        <button class="btn-eliminar"> Eliminar </button>
      </div>
    `;

    //como definimos varios elementos nuevos desde el innerHTML ahora debemos capturarlos para poder operarlos
    // captura los botones creados en el article
    const btnRestar = article.querySelector(".btn-restar") as HTMLButtonElement;
    const btnSumar = article.querySelector(".btn-sumar") as HTMLButtonElement;
    
    //captura el valor de la variable "cantidad" que contará cuantas unidades hay de un producto
    const spanCantidad = article.querySelector(".quantity-selector-txt") as HTMLSpanElement;
    //captura el boton eliminar
    const btnEliminar = article.querySelector(".btn-eliminar") as HTMLButtonElement;

    // B - EVENTOS QUE VAN A PERMITIR GESTIONAR LA CANTIDAD DE UNIDADES DE UN PRODUCTO

    // Evento que permite SUMAR de a una unidad a la cantidad item
    btnSumar.addEventListener("click", () => {
      cantidad++; //suma 1 a la cantidad de un item
      spanCantidad.textContent = cantidad.toString(); //utilizamos to string para poder representar el valor obtenido como un string
      precioTotal += producto.precio; //recalcula el precio total
      
      mostrarTotal(); //actualiza el precio total
      
      actualizarCantidad(producto.id, cantidad);
    });

    // Evento que permite RESTAR una unidad a la cantidad de un item
    btnRestar.addEventListener("click", () => {
      if (cantidad > 1) { // condicional que evita que la cantidad sea menor a 1
        cantidad--; //resta 1 a la cantidad de un item
        spanCantidad.textContent = cantidad.toString(); //utilizamos to string para poder representar el valor obtenido como un string
        precioTotal -= producto.precio; //recalcula el precio total
        mostrarTotal(); //actualiza el precio total

        actualizarCantidad(producto.id, cantidad);
      }
    });

    // Evento para ELIMINAR un item del carrito 
    btnEliminar.addEventListener("click", () => {
      eliminarItem(producto.id); //llama la funcion eliminar
      article.remove(); //remueve el articulo
      precioTotal -= producto.precio * cantidad; //resta el precio de un item y su cantidad al precio total
      mostrarTotal(); //actualiza el total

      // Si después de eliminar no quedan más artículos, se muestra el mensaje de carrito vacio
      if (CajaCarrito.querySelectorAll("article").length === 0) {
        mostrarMensajeCarritoVacio();
      }
    });
    
    // C - AÑADIMOS LOS ITEMS CREADOS AL CONTENEDOR DE PRODUCTOS
    CajaCarrito.appendChild(article);
    precioTotal = precioTotal + producto.precio * cantidad;
  });

  // D - DETECCIÓN DE CONTENEDOR VACIO

  // Detecta si no hay artículos en el contenedor y activa un un mensaje dentro de el
  const mostrarMensajeCarritoVacio = () => {
    // limpia el contenedor principal
    CajaCarrito.innerHTML = "";
    // crea  un nuevo container
    const divVacio = document.createElement("div");
    divVacio.classList.add("carrito-vacio-container");
    divVacio.innerHTML = `
    <h2 class="mensaje-vacio">Tu carrito está vacío</h2>
    `;

    // añade el bloque con el mensaje al contenedor principal
    CajaCarrito.appendChild(divVacio);
    
    // Desactiva el contenedor derecho que muestra el Resumen para que el contenedor izquierdo ocupe toda la pantalla
    const tarjetaResumen = document.querySelector(".tarjeta-der",) as HTMLDivElement;
    tarjetaResumen?.classList.add("tarjeta-der--ocultar"); //desactiva el contenedor
  };

  // Verifica al cargar
  if (productosEnCarrito.length === 0) {
    mostrarMensajeCarritoVacio();
  }

  // E - BORRAR CARRITO

  // Evento que permite borrar todo el carrito
  btnVaciar.addEventListener("click", () => {
    clearCart(); //ejecuta la funcion que borra los items del localStorage
    alert("El carrito quedó vacío. Pedido cancelado"); //mensaje que avisa que el carrito se vació
    precioTotal = 0; //vuelve el precio total a cero
    mostrarTotal(); //actualiza el precio total en el contenedor
    mostrarMensajeCarritoVacio(); //muestra el contenedor con el mensaje de carrito vacio y oculta los contenedores de producto y recumen
  });
}

// =========================================================================

// 6 - FUNCIONES ADICIONALES QUE TRABAJAN CON EL LOCALSTORAGE

// PARA LAS ACCIONES DE SUMAR, RESTAR O ELIMINAR ITEMS

//Funcion para eliminar un producto entero.
function eliminarItem(id: number) {
  // lee los productos existentes en LocalStorage
  const carritoActual: IcartItem[] = getCart();

  // filtra todos excepto el que tenga el id capturado
  const carritoActualizado = carritoActual.filter(
    (producto) => producto.id !== id,
  );

  // actualiza sobreescribiendo el localStorage
  saveCart(carritoActualizado);
  // retorna la cantidad de productos que quedan
  return carritoActualizado.length;
}

//Funcion para actulizar la cantidad al restar o sumar
function actualizarCantidad(id: number, nuevaCantidad: number) {
  //obtiene los productos del localStorage
  const carritoActual: IcartItem[] = getCart();
  // modifica unicamente el producto elegido
  const carritoActualizado = carritoActual.map((producto) => {
    if (producto.id === id) {
      // actualiza la cantidad
      return { ...producto, cantidad: nuevaCantidad };
    }
    return producto;
  });
  // actualiza los datos nuevos en el localStorage
  saveCart(carritoActualizado);
}

// ==================================================================

// 7 - CARGA INICIAL DE FUNCIONES QUE PERMITEN VISUALIZAR LA INFORMACIÓN 

// construye los artículos y los añade al contenedor
cargarItems(); 
//actualiza el total en su contenedor
mostrarTotal();