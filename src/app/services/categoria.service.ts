import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { Categoria } from '../components/models/categoria';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url:string;

  constructor(private _http: HttpClient, private authService:AuthService) {
    this.url=GLOBAL.url;
  }
  getAllCategories():Observable<Categoria[]>{
    return this._http.get<Categoria[]>(this.url+'categoria', { headers: this.authService.agregarAuthorizationHeader() });
  }

  delete(id:number):Observable<any>{
    return this._http.delete(this.url+'categoria/'+id, { headers: this.authService.agregarAuthorizationHeader() });
  }

  save(categoria:Categoria):Observable<any>{
    return this._http.post(this.url+'categoria',categoria, { headers: this.authService.agregarAuthorizationHeader() });
  }
}
