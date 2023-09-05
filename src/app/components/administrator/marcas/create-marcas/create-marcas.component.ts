import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marca } from 'src/app/components/models/marca';
import { MarcaService } from 'src/app/components/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-marcas',
  templateUrl: './create-marcas.component.html',
  styleUrls: ['./create-marcas.component.css']
})
export class CreateMarcasComponent {

  marca:Marca;

  value = '';

  constructor(private marcasService:MarcaService, private snack: MatSnackBar) { 
    this.marca=new Marca();
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.marcasService.createMarca(this.marca).subscribe(
        response => {
          this.snack.open('Marca creada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.marca = new Marca();
          registroForm.reset();
          Swal.fire(
            'Marca creada',
            `Marca ${response.nombre} creada con éxito!`,
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
