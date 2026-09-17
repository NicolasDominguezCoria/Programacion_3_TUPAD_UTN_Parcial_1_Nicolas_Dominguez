
/*SECCIÓN DE AUTENTICACIÓN DE USUARIO Y LOGOUT (Práctico anterior) */

import { checkAuhtUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});


const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/client/home/home.html",
    "client"
  );
};
initPage();


/*  ====================================================
              DESARROLLO PARCIAL 1 - PROGRAMACION 3
 ======================================================= */

// 1 - IMPORTAMOS LAS FUNCIONES Y TIPOS NECESARIOS 
import { getProducts, getCategories } from "../../../data/data";
import type { Iproduct, IcartItem } from "../../../types/product";
import type { ICategoria } from "../../../types/categoria";
import { getCart, saveCart } from "../../../utils/cart";

// =================================================================

//2 - EXTRAEMOS LOS DATOS DE CATEGORIAS Y PRODUCTOS DATA.TS  

// llama y guarda la lista de categorias de data.ts
const categorias = getCategories();

// llama y guarda la lista de productos de data.ts
const ProductosTodos = getProducts();

// variable que servirá para contener productos filtrados por categoria o por nombre
let productosFiltrados = ProductosTodos;

// =================================================================

//3 - CAPTURAMOS LOS CONTENEDORES Y ELEMENTOS DEL HTML QUE USAREMOS 

// captura el contenedor principal donde se acumularan los productos
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLDivElement;

// Selecciona el <ul> de home.html donde se van a mostrar las categorías.
const menuCategorias = document.getElementById("lista-categorias") as HTMLUListElement;

// captura el input de búsqueda.
const inputBuscar = document.getElementById("buscar") as HTMLInputElement;

// =================================================================
 
// 4 - FUNCION PARA CREAR TARJETA DE PRODUCTOS E INYECTARLAS EN SU CONTENEDOR

// Recibe como parámetro la lista de productos 
function cargarProductos(listaDeProductos: Iproduct[]) {
  // limpia el contenedor
  contenedorProductos.innerHTML = "";
  // crea una tarjeta o card por cada producto de la lista, .
  listaDeProductos.forEach((producto) => {
    // crea el molde o marco de cada tarjeta.
    const article = document.createElement("article");
    article.classList.add("product-card");

    // Verificación de seguridad: Extrae el nombre de su categoría y verifica que exista
    const categoriaNombre = producto.categorias && producto.categorias.length > 0 ? 
      producto.categorias[0].nombre: "Sin categoría";  //si no tiene categoría, se le coloca por defecto "Sin categoría".
    
    // formato de la información contenida en la tarjeta o card
    article.innerHTML = `
      <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
      <p class="categoria-card"> Categoría: ${categoriaNombre}</p>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio-card">Precio: <strong>$ ${producto.precio}</strong></p>`;

    // Crea el botón "Añadir" para agregar productos al carrito.
    const btnAniadir = document.createElement("button");
    btnAniadir.classList.add("product-card-button");
    btnAniadir.textContent = "Añadir";

    // Acción del boton al escuchar un click 
    btnAniadir.addEventListener("click", () => {
      agregarAlCarrito(producto, btnAniadir); //añade al carrito una unidad del producto al cual pertenece y genera el efecto visual en el boton
    });

    //Colocar el botón adentro de la tarjeta, y la tarjeta adentro del contenedor del dom.
    article.appendChild(btnAniadir);
    contenedorProductos.appendChild(article);
  });

  //CONDICIONAL PARA LA BÚSQUEDA SIN RESULTADOS.
  if (listaDeProductos.length === 0) {
    const mensajeError = document.createElement("h2");
    mensajeError.classList.add("mensaje-error");
    mensajeError.textContent = "No hay resultados para esta busqueda";
    contenedorProductos.appendChild(mensajeError);
  }
}

// =================================================================

// 5 - FUNCION DE BUSQUEDA POR CATEGORÍAS (izquierda)
// Carga las categoría en la barra lateral.
const cargarCategorias = (categorias: ICategoria[]) => {
  
  // Crea la primera opción para ver todas las categorías.
  const liTodo = document.createElement("li");
  liTodo.innerHTML = `<a href="#">Ver todas</a>`;
  liTodo.addEventListener("click", () => {
    productosFiltrados = ProductosTodos
    cargarProductos(productosFiltrados);
  });
  menuCategorias.appendChild(liTodo);

  // Recorre cada categoría para crear un <li> con cada una.
  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${categoria.nombre}</a>`;

    //  Realiza el filtrado por su categoría al hacer click
    li.addEventListener("click", () => {
      // Toma la lista de productos actuales para comparar su categoria
      productosFiltrados = ProductosTodos.filter((producto) => {
        return producto.categorias?.some((cat) => cat.nombre === categoria.nombre,);
      });
      // Carga los resultados filtrados.
      cargarProductos(productosFiltrados);
    });

    // Inyecta cada elemento de categoría adentro del la lista del HTML.
    menuCategorias.appendChild(li);
  });
};

// =================================================================

// 6 - INPUT DE BÚSQUEDA POR NOMBRE

// Evento que captura lo que el usuario va tipeando letra a letra y lo pasa a minúsculas.
inputBuscar.addEventListener("input", (e) => {
  const busqueda = (e.target as HTMLInputElement).value.toLowerCase();

  // Filtra sobre el total de productos en tiempo real.
  const resultado = productosFiltrados.filter((producto) => {
    return producto.nombre.toLowerCase().includes(busqueda);
  });
  //devuelve el resultado 
  cargarProductos(resultado);
});

// =================================================================

// FUNCION PARA AÑADIR UN PRODUCTO AL CARRITO (ES DECIR GUARDARLO EN LOCALSTORAGE) 
function agregarAlCarrito(productoClickeado: Iproduct, boton: HTMLButtonElement) {
  const listaDeCompras: IcartItem[] = getCart();

  // Busca si el item esta en la lista
  const productoExistente = listaDeCompras.find(
    (item) => item.id === productoClickeado.id,
  );

  // Si el producto no existe en la lista lo crea y lo añade a la lista con sus propiedades (spread) mas la cantidad = 1
  if (!productoExistente) {
      const nuevoItemCarrito: IcartItem = { ...productoClickeado, cantidad: 1 };
      listaDeCompras.push(nuevoItemCarrito);
  } else { // Si ya existe y le suma uno al producto 
      productoExistente.cantidad++;
  }

  // Guarda el carrito actualizado en el Local Storage
  saveCart(listaDeCompras);

  // Efecto visual en el botón.
  boton.textContent = " ✓ Agregado"
  boton.classList.add("agregado");

  setTimeout(() => {
    boton.textContent = "+ Agregar";
    boton.classList.remove("agregado");
  }, 500)
}

// 7 - CARGA DE DATOS INICIAL
cargarCategorias(categorias);
cargarProductos(productosFiltrados);