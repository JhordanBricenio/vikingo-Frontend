import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  usuario:Usuario

  constructor(public authService: AuthService, private router:Router,
     private usuarioService:UsuarioService){

    this.usuario=new Usuario();

  }

  ngOnInit(): void {
    this.initData();
  }
  
  logout():void{
    let username = this.authService.usuario.email.slice(0,7);
    this.authService.logout();
    Swal.fire('Adiós', `${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/']);
  }

  initData(){
    this.usuarioService.findByEmail(this.authService.usuario.email).subscribe(
      response=>{
        this.usuario=response
      }
    );

  }


}
