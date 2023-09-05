import { Product } from "./product";

export class DVenta {
    id:number;
    cantidad:number=1;
    producto:Product;
    importe: number;

    public calcularImporte():number{
        return this.cantidad*this.producto.precioVenta;
    }
}
