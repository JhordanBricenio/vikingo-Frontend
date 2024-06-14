import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../components/models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _usuario: Usuario;
  private _token: string;

  public url = 'http://localhost:9090/api/auth'

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    }
    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    }
    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/sign-in`, loginData);
  }

  public agregarAuthorizationHeader() {
    let token = this.token;
    if (token != null) {
      return this.httheaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httheaders;
  }

  public guardarUsuario(accessToken: string) {
    let payload = this.obtenerDatosToken(accessToken);  
    this._usuario = new Usuario();
    this._usuario.email = payload.sub;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }
  public guardarToken(accessToken: string) {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  isAuntenitcated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {  
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.isAuntenitcated()) {
        this.logout();
      }
      return true;
    }
    if (e.status == 403) {
      alert('No tienes permisos para realizar esta acción');
      return true;
    }
    return false;
  }




}
