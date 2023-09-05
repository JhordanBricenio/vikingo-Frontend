import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  public url:string;

  constructor(private _http: HttpClient) {
    this.url=GLOBAL.url;
  }
  getAllMarcas():Observable<Marca[]>{
    return this._http.get<Marca[]>(this.url+'marcas');
  }

  getMarca(id:number):Observable<Marca>{
    return this._http.get<Marca>(this.url+'marcas/'+id);
  }

  createMarca(marca:Marca):Observable<Marca>{
    return this._http.post<Marca>(this.url+'marcas', marca);
  }

  deleteMarca(id:number):Observable<Marca>{
    return this._http.delete<Marca>(this.url+'marcas/'+id);
  }
}
