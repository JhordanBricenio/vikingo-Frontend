import { Component } from '@angular/core';
import { Marca } from 'src/app/components/models/marca';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-marcas',
  templateUrl: './index-marcas.component.html',
  styleUrls: ['./index-marcas.component.css']
})
export class IndexMarcasComponent {

  marcas:Marca[] = [];
  
    constructor(private marcasService:MarcaService) { }

    ngOnInit(): void {
      this.marcasService.getAllMarcas().subscribe(
        res => {
          this.marcas = res;
        }
      )
    }

    delete(marca: Marca): void {
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
          text: `Seguro que desea eliminar la Marca! ${marca.nombre}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.marcasService.deleteMarca(marca.id).subscribe((response) => {
              this.marcas = this.marcas.filter((cli) => cli !== marca);
              swalWithBootstrapButtons.fire(
                'Marca Eliminado!',
                `Marca ${marca.nombre} Eliminada con éxito.`,
                'success'
              );
              });
          }
        });
    }



}
