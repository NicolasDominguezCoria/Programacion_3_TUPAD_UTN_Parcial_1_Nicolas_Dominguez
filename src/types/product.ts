import type { ICategoria } from "./categoria";

export interface Iproduct {
    id: number;
    eliminado: boolean;
    createdAt: string;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    categorias: ICategoria[];
}

export interface IcartItem extends Iproduct{
    cantidad: number;
}