import { Component } from '@angular/core';
import { Venta } from 'src/app/components/models/venta';
import { ModalService } from 'src/app/components/services/modal.service';
import { VentaService } from 'src/app/components/services/venta.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import Swal from 'sweetalert2';
import { DVenta } from 'src/app/components/models/d-venta';
import { ImprimirService } from 'src/app/components/services/imprimir.service';



@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})


export class IndexVentasComponent {

  ventas: Venta[] = [];
  dVentas: Venta[] = [];
  total = 0;
  totalGanancia = 0;
  totalDeudas = 0;

  public desde;
  public hasta;

  constructor(private ventasService: VentaService, private modalService: ModalService,
    private imprimirService: ImprimirService) { }

  ngOnInit(): void {
    this.initData();
  }
  initData() {
    if (this.desde == null && this.hasta == null) {
      this.ventasService.getVentasByFecha().subscribe(
        response => {
          this.ventas = response;

          //Mostrar el monton total de las ventas
          this.total = 0;
          this.ventas.forEach((item: Venta) => {
            this.total += item.totalPagar;
            if (item.estado == 'Pendiente') {
              this.totalDeudas += item.totalPagar;
            }
          });
        }
      );
    }
  }

  delete(venta: Venta): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Está seguro?',
        text: `Seguro que desea eliminar la Venta! ${venta.nventa}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ventasService.deleteVenta(venta.id).subscribe((response) => {
            this.ventas = this.ventas.filter((cli) => cli !== venta);
            swalWithBootstrapButtons.fire(
              'Venta Eliminado!',
              `Venta ${venta.nventa} Eliminada con éxito.`,
              'success'
            );
            this.total -= venta.totalPagar;
            this.totalDeudas -= venta.totalPagar;
          });
        }
      });
  }
  reset(): void {
    this.desde = null;
    this.hasta = null;
    this.initData();
  }

  filtrar() {
    const dt = new Date(this.desde)
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    const day = dt.getDate()
    const fecha = year + '/' + month + '/' + day
    //Convertir fecha a tipo Date
    const fecha1 = new Date(fecha)


    const dt2 = new Date(this.hasta)
    const year2 = dt2.getFullYear()
    const month2 = dt2.getMonth() + 1
    const day2 = dt2.getDate()
    const fecha2 = year2 + '/' + month2 + '/' + day2
    const fecha3 = new Date(fecha2)


    this.ventasService.getVentasByFecha(fecha1, fecha3).subscribe(
      response => {
        this.ventas = response;
        //Mostrar el monton total de las ventas
        this.total = 0;
        this.ventas.forEach((item: Venta) => {
          this.total += item.totalPagar;
        });

      });
  }
  //cambia el estado de la venta
  cambiarEstadoCerrada(ventaId: number) {
    this.ventasService.updateVenta(ventaId, 'Cerrada').subscribe(
      response => {
        this.ventas = this.ventas.map((item: Venta) => {
          if (ventaId === item.id) {
            item.estado = 'Cerrada';
          }
          return item;
        });
      }

    );

  }

  cambiarEstadoPagada(ventaId: number) {
    this.ventasService.updateVenta(ventaId, 'Pagada').subscribe(
      response => {
        this.ventas = this.ventas.map((item: Venta) => {
          if (ventaId === item.id) {
            item.estado = 'Pagada';
          }
          return item;
        });
      }

    );

  }

  imprimir() {
    this.ventasService.getAllVentas().subscribe(
      data => {  
        const ventasPagadas = data.filter(venta => venta.estado === 'Pagada');
        const ventasPendientes = data.filter(venta => venta.estado === 'Pendiente');
        
        const gananciaTotalPagadas = ventasPagadas.reduce((total, venta) => {
          const gananciaVenta = venta.dventas.reduce((ganancia, dventas) => ganancia + dventas.ganancia, 0);
           return total + gananciaVenta;
        }, 0);
  
        const gananciaTotalPendientes = ventasPendientes.reduce((total, venta) => {
          const gananciaVenta = venta.dventas.reduce((ganancia, dventas) => ganancia + dventas.ganancia, 0);
          return total + gananciaVenta;
        }, 0);
  
        

        const totalVentas = data.reduce((total, venta) => {
          if (venta.estado !== 'Cerrada') {
            return total + venta.totalPagar;
          }
          return total;
        }, 0);
        
        const totalDeudas = ventasPendientes.reduce((total, venta) => total + venta.totalPagar, 0);
  
        const ventasArray = data.map(venta => [venta.id, venta.nota, venta.fecha, venta.totalPagar,venta.estado, venta.dventas.reduce((ganancia, dventas) => ganancia + dventas.ganancia, 0)]);
        const encabezado = ["ID", "Cliente", "Fecha", "Total", "Estado", "Ganancia"];

        const totalInversion=totalVentas-( gananciaTotalPagadas + gananciaTotalPendientes);
  
        ventasArray.push(["", "", "", "Ganancia Total Pagada", gananciaTotalPagadas]);
        ventasArray.push(["", "", "", "Ganancia Total Pendiente", gananciaTotalPendientes]);
        ventasArray.push(["", "", "", "Total Deudas", totalDeudas]);
        ventasArray.push(["", "", "", "Total Inversión", totalInversion]);
        ventasArray.push(["", "", "", "Total Ventas", totalVentas]);
  
        this.imprimirService.imprimirFactura(encabezado, ventasArray, "Reporte de ventas", true);
      }
    );
  }

  imprimirGeneral(){
    this.ventasService.getAllVentas().subscribe(
      data => { 
        
        const totalVentas = data.reduce((total, venta) => {return total+venta.totalPagar}, 0);
  
        const ventasArray = data.map(venta => [venta.id, venta.nota, venta.fecha, venta.totalPagar,venta.estado]);
        const encabezado = ["ID", "Cliente", "Fecha", "Total", "Estado"];
        ventasArray.push(["", "", "", "Total Ventas", totalVentas]);
        this.imprimirService.imprimirFactura(encabezado, ventasArray, "Reporte de ventas", true);
      }
    );
  }
  
}
