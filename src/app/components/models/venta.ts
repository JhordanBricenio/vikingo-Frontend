import { DVenta } from "./d-venta";

export class Venta {
    id:number;
    nVenta:string;
    totalPagar:number;
    envio_precio:number;
    estado:string;
    nota:string;
    fecha:Date;
    dVenta: Array<DVenta>=[]
}
