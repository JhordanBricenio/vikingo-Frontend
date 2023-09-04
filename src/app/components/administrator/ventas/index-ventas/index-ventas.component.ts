import { Component } from '@angular/core';
import { Venta } from 'src/app/components/models/venta';
import { ModalService } from 'src/app/components/services/modal.service';
import { VentaService } from 'src/app/components/services/venta.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import Swal from 'sweetalert2';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})


export class IndexVentasComponent {

  ventas:Venta[]=[];
   total = 0;

  public desde;
  public hasta;

  constructor(private ventasService:VentaService, private modalService:ModalService) { }

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
            this.total-=venta.totalPagar;
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
    const month = dt.getMonth() +1
    const day = dt.getDate() 
    const fecha = year + '/' + month + '/' + day
    //Convertir fecha a tipo Date
    const fecha1 = new Date(fecha)
    

    const dt2 = new Date(this.hasta)
    const year2 = dt2.getFullYear()
    const month2 = dt2.getMonth()+1
    const day2 = dt2.getDate()
    const fecha2 = year2 + '/' + month2 + '/' + day2
    const fecha3 = new Date(fecha2)


    this.ventasService.getVentasByFecha(fecha1,fecha3).subscribe(
      response => {
        this.ventas = response;
        //Mostrar el monton total de las ventas
        this.total = 0;
        this.ventas.forEach((item: Venta) => {
          this.total += item.totalPagar;
        });

        });
      } 

}
