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
    dventas: Array<DVenta>=[]

    calcularGranTotal(): number {
        this.totalPagar = 0;
        this.dventas.forEach((item: DVenta) => {
          this.totalPagar += item.calcularImporte();
        });
        return this.totalPagar;
      }
}
