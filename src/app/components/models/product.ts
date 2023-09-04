import { Categoria } from "./categoria";
import { Marca } from "./marca";

export class Product {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad:number;
    cantidadCaja:number;
    precio: number;
    precioVenta: number;
    imagen: string;
    stock: string;
    sku: string;
    estado: string;
    createdAt: string;
    nventas: number;
    descuento: number;
    categoria:Categoria;
    marca:Marca;
}
