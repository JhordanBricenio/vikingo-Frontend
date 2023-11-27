import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  usuario:Usuario;
  public fotoSeleccionada:File;
  progreso:number = 0;

  constructor(private activatedRoute:ActivatedRoute, private usuarioService:UsuarioService){
    this.usuario= new Usuario();

  }

  ngOnInit(): void {
   this.initData();
  }

  initData(){
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        console.log(id);    
        this.usuarioService.findByEmail(id).subscribe(
          response => {
            this.usuario = response;           
          }
        );
      }
    );
  }


  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.fotoSeleccionada = null;
    }

    }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error', 'Debe seleccionar una foto', 'error');
    }else{
      this.usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.id).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.usuario = response.usuario as Usuario;
          Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
        }
      });
    }
  }
}
