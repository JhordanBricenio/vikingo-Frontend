import { DVenta } from "./d-venta";

export class Venta {
    id:number;
    nventa:string;
    totalPagar:number;
    envio_precio:number;
    metodoPago:string;
    estado:string;
    nota:string;
    fecha:Date;
    observacion:string;
    dVentas: Array<DVenta>=[]
}
