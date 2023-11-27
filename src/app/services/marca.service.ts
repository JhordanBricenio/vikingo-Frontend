import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Marca } from '../components/models/marca';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  public url:string;

  constructor(private _http: HttpClient, private authService:AuthService) {
    this.url=GLOBAL.url;
  }
  getAllMarcas():Observable<Marca[]>{
    return this._http.get<Marca[]>(this.url+'marcas', { headers: this.authService.agregarAuthorizationHeader() });
  }

  getMarca(id:number):Observable<Marca>{
    return this._http.get<Marca>(this.url+'marcas/'+id, { headers: this.authService.agregarAuthorizationHeader() });
  }

  createMarca(marca:Marca):Observable<Marca>{
    return this._http.post<Marca>(this.url+'marcas', marca, { headers: this.authService.agregarAuthorizationHeader() });
  }

  deleteMarca(id:number):Observable<Marca>{
    return this._http.delete<Marca>(this.url+'marcas/'+id, { headers: this.authService.agregarAuthorizationHeader() });
  }
}
