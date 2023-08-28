import { Categoria } from "./categoria";
import { Marca } from "./marca";

export class Product {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad:number;
    cantidadCaja:number;
    precio: number;
    imagen: string;
    stock: string;
    descuento: number;
    categoria:Categoria;
    marca:Marca;
}
