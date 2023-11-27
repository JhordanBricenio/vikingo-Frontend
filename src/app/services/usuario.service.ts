import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { GLOBAL } from './GLOBAL';
import { Usuario } from '../components/models/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url:string;

  constructor(private http:HttpClient, private authService:AuthService) {
    this.url=GLOBAL.url;
   }

   getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url+'usuario'}/${id}`).pipe(
      catchError((e) => {
        console.log(e.error.mensaje);
        Swal.fire(' Error al obtener', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  save(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url + 'usuario', usuario);

  }

  subirFoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    const req= new HttpRequest('POST',`${this.url}usuario`+'/upload', formData,{
      reportProgress:true
    });

    return this.http.request(req).pipe(
      catchError(e =>{
      return throwError(() => e);
      })
    );
    }

    //Buscar usuario por email
    findByEmail(email: string): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.url}usuario` + '/findByEmail/' + email, { headers: this.authService.agregarAuthorizationHeader() }).pipe(
        catchError((e) => {
          console.log(e.error);
          Swal.fire(' Error al obtener', 'errr', 'error');
          return throwError(() => e);
        })
      );
    }


    
}
