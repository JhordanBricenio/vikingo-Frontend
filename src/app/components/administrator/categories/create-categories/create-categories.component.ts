import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/components/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent {

  categoria:Categoria;
  value='';

  constructor(private categoriasService:CategoriaService, private snack: MatSnackBar) {

    this.categoria=new Categoria();
   }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.categoriasService.save(this.categoria).subscribe(
        response => {
          this.snack.open('Categoría creada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.categoria = new Categoria();
          registroForm.reset();
          Swal.fire(
            'Categoría creada',
            `Categoría ${response.nombre} creada con éxito!`,
            'success'
          );
          
        }
      );
    }else{
      this.snack.open('Los datos del formulario no son válidos', 'Cerrar', {
        duration: 3000
      });
    }
  }


}
