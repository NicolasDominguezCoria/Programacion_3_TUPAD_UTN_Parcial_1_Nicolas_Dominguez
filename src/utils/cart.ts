/*
Ya existe un archivo  que gestiona los usuarios creados verificar el login. 
Por recomendación del tutor y con el fin no mezclar responabilidades con logín en un mismo archivo
las funciones destinadas a gestional pedidos de productos con persistencia en localStorage se colocan en éste (/utils/cart.ts)
para de esa forma mantenerlo separado de la gestion de usuarios.
*/

import type { IcartItem } from "../types/product";

// Guarda el carrito completo
export const saveCart = (carrito: IcartItem[]) => {
  localStorage.setItem("productos", JSON.stringify(carrito));
};

// Obtiene el carrito o una lista vacía si no hay productos
export const getCart = (): IcartItem[] => {
  const data = localStorage.getItem("productos");
  return data ? JSON.parse(data) : [];
};

// Limpia o vacia el carrito
export const clearCart = () => {
  localStorage.removeItem("productos");
};