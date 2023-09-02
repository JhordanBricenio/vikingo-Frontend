import { Component } from '@angular/core';
import { Venta } from 'src/app/components/models/venta';
import { ModalService } from 'src/app/components/services/modal.service';
import { VentaService } from 'src/app/components/services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent {

  ventas:Venta[]=[];

  constructor(private ventasService:VentaService, private modalService:ModalService) { }

  ngOnInit(): void {
    this.initData();
  }
  initData(){
    this.ventasService.getAllVentas().subscribe(
      response => {
        this.ventas=response;
        console.log(this.ventas);
        
      }
    );
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
          });
        }
      });
  }

}
