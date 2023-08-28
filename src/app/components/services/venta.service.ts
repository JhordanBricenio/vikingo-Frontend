import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;
  
  constructor(private _http: HttpClient) {
    this.url=GLOBAL.url;
  }
  getAllVentas():Observable<Venta[]>{
    return this._http.get<Venta[]>(this.url+'ventas');
  }
}
