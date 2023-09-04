import { Product } from "./product";

export class DVenta {
    id:number;
    cantidad:number=1;
    producto:Product;
    subtotal:number;

    public calcularImporte():number{
        return this.cantidad*this.producto.precio;
    }
}
