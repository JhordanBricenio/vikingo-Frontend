import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url:string;

  constructor(private _http: HttpClient) {
    this.url=GLOBAL.url;
  }
  getAllCategories():Observable<Categoria[]>{
    return this._http.get<Categoria[]>(this.url+'categoria');
  }
}
