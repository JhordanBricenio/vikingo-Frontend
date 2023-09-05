import { DVenta } from "./d-venta";

export class Venta {
    id:number;
    nventa:string;
    totalPagar:number;
    envio_precio:number=0;
    metodoPago:string;
    estado:string;
    nota:string;
    fecha:Date;
    observacion:string;
    dventas: Array<DVenta>=[]

    //sumar el precio de envio al total a pagar

    calcularGranTotal(): number {
        this.totalPagar = 0;

        this.dventas.forEach((item: DVenta) => {
          this.totalPagar += item.calcularImporte();
          this.totalPagar += this.envio_precio;
        });
        return this.totalPagar;
      }
}
