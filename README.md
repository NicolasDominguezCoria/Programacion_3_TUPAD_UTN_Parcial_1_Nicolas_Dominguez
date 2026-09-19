# Presentacion Parcial 1 - Food Store - Client Home -  Carrito de Pedidos modificacion

Alumno: Daniel Nicolas Dominguez Coria, DNI: 35085946
Tutor: Luciano Chiroli
Asignatura: Programacion 3
TUPAD -  UTN

# Video
[Video explicación del código] (https://drive.google.com/file/d/1vR0ti9mjdR8Qz-_giSS8q5uaOOjGjKxD/view?usp=sharing) 
---
### Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### 🚀 Instalación y Uso
Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm
Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto
Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto
Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

# Estructura del proyecto añadida para esta consigna
Food_Store/
├── 📂public/
│   └── 📂assets/               # Imágenes de los productos y logo
├── 📂src/
│   ├── 📂data/
│   │    └── data.ts           # Array PRODUCTS, getProducts(), getCategorias() 
│   ├── 📂types/
│   │    ├── product.ts        # Interfaces Iproduct y IcartItem
│   │    └── categoria.ts      # Interface ICategoria
│   ├── 📂pages/
│   │    ├── 📂auth/
│   │    │    ├── 📂login/
│   │    │    └── 📂registro/
│   │    ├── 📂client/
│   │    │    ├── 📂cart/
│   │    │    │    ├── cart.html    # Vista del Carrito
│   │    │    │    └── cart.ts      # Render del carrito y total
│   │    │    └── 📂home/
│   │    │         ├── home.html     # Catálogo de productos
│   │    │         └── home.ts       # Render, búsqueda y filtro
│   │    └── 📂admin/
│   │          └── 📂home/
│   └── 📂utils/ 
│        └── cart.ts              # Lógica del carrito (localStorage)
├── tsconfig.json
├── package.json
├── index.html                
├── vite.config.ts            # Configuración multi-página de Vite
└── README.md                 # Este documento 

# Descripción
Aplicación de Tienda de Comidas y Bebidas que permite a los usuarios  "client" ingresar con usuario y contraseña, navegar por un catálogo de productos, filtrar por categorías, buscar productos por nombre y gestionar un carrito de compras interactivo con persistencia de datos en localStorage. Implementado con Vite + TypeScript, sin frameworks ni librerías externas. Tecnologías utilizadas: HTML5, CSS, TypeScript, Javascript, Vite.

# Funcionalidades
- Catálogo Dinámico de productos.
- Filtrado de producto por categoría.
- Búsqueda de producto por nombre.
- Agregar productos al carrito con feedback visual en botones.
- Carrito de compras con persistencia en localStorage.
- Visualización del carrito con items y total general.
- Actualizar cantidad de productos con botones + y -.
- Eliminar productos individuales del carrito.
- Vaciar el carrito completo.

---

## Ejecución de la aplicación
1. Al inicializar la aplicación se visualiza el login donde el usuario puede iniciar sesion con su email y contraseña
2. Para ingresar con usuario del tipo "client":  **email: client@mail.com y constraseña: client**
3. Una vez ingresa como client por defecto muestra el catálogo de productos. 
4. Estando en el Catálogo, con enlace "Ir al Carrito" ubicado a la derecha del header el usuario puede navegar hacia el Carrito. 
5. Estando en el Carrito, con enlace "Volver al Catálogo" ubicado a la derecha del header el usuario puede navegar hacia el Catálogo.
6. Estando en el Catálogo, con boton "LOGOUT" ubicado tambien en el extremo derecho del header, el usuario puede cerrar sesión y navegar al login.

##  Persistencia de Pedidos en Local Storage:

El mecanismo que gestiona la pesistencia de pedidos desde el código TypeScript se encuentra en la carpeta `src/utils/cart.ts`:

## Nivel de Seguridad
La protección de rutas y la persistencia de pedidos implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.
- **Razón**: La lógica de autenticación y la perisstencia de pedidos se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas y a la manipulacion o eliminación de los pedidos generados.

Este enfoque es útil únicamente para fines de cumplimentar con la consigna.

## Estilo
El estilo visual del proyecto se reparte entre:
- globalStyle.css: Gestiona estilos de los elementos principales y/o comunes en archivos .html como body, header, footer para mantener un estilo base en todo el proyecto
- homeStyle.css: Gestiona el estilo de los elementos en src/client/home/home.html
- cartStyle.css: Gestiona el estilo de los elementos en src/client/cart/cart.html 
- loginStyle.css: Gestiona el estilo de los elementos en src/auth/login/login.html y src/auth/registro/registro.html

---