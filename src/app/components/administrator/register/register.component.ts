import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario:Usuario;

  constructor(private usuarioService:UsuarioService, private snack:MatSnackBar){
    this.usuario= new Usuario();

  }
  ngOnInit(): void {
   
    
  }

  
  registro(registroForm: any) {
    if (registroForm.valid) {
      this.usuarioService.save(this.usuario).subscribe(
        response => {
          this.snack.open('Usuario registrado con éxito', 'Cerrar', {
            duration: 3000
          });
          this.usuario = new Usuario();
          registroForm.reset();
          Swal.fire(
            'Usuario creado',
            `Usuario ${response.nombre} creado con éxito!`,
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
