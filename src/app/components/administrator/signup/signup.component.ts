
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailFormControl= new FormControl('', [ Validators.required, Validators.email, ]);
  passwordFormControl=new FormControl('', [ Validators.required, Validators.required, ]);

  matcher = new MyErrorStateMatcher();

  usuario: Usuario;


  constructor(private snack:MatSnackBar, private authService:AuthService, private router:Router) { 
    this.usuario = new Usuario();

  }

  ngOnInit(): void {
    if(this.authService.isAuntenitcated()){
      Swal.fire('Login', `Hola ${this.authService.usuario.email} ya estás autenticado!`, 'info');
      this.router.navigate(['/admin']);
    }
  }

  login():void{
    if(this.emailFormControl.invalid || this.passwordFormControl.invalid){
      this.snack.open('Email o password incorrectos', 'AVISO', {duration: 2000});
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {   
      this.authService.guardarUsuario(response.jwt);
      this.authService.guardarToken(response.jwt);
      let usuario = this.authService.usuario;
      this.router.navigate(['/admin']);
      Swal.fire('Login', `Hola ${usuario.email.slice(0,7)}, has iniciado sesión con éxito!`, 'success');
    },
    err => {
      if(err.status == 401){
        Swal.fire('Error Login', 'Email o clave incorrecta!', 'error');
      }
    }
    );
    
    

  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
