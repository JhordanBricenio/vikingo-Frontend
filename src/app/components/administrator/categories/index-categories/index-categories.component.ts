import { Component } from '@angular/core';
import { Categoria } from 'src/app/components/models/categoria';
import { CategoriaService } from 'src/app/components/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-categories',
  templateUrl: './index-categories.component.html',
  styleUrls: ['./index-categories.component.css']
})
export class IndexCategoriesComponent {

  categories:Categoria[];

  constructor(private categoriasService:CategoriaService) {
  }

  ngOnInit(): void {

    this.categoriasService.getAllCategories().subscribe(
      response => {
        this.categories = response;
      }
    ); 
  }

  delete(categoria: Categoria): void {
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
        text: `Seguro que desea eliminar la Categoría! ${categoria.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoriasService.delete(categoria.id).subscribe((response) => {
            this.categories = this.categories.filter((cli) => cli !== categoria);
            swalWithBootstrapButtons.fire(
              'Categoría Eliminado!',
              `Categoría ${categoria.nombre} Eliminada con éxito.`,
              'success'
            );
            });
        }
      });
  }

}
