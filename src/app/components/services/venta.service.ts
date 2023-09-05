import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

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

  getVentaById(id):Observable<Venta>{
    return this._http.get<Venta>(this.url+'ventas/'+id);
  }

  deleteVenta(id):Observable<any>{
    return this._http.delete(this.url+'ventas/'+id);
  }

  saveVenta(venta:Venta):Observable<any>{
    return this._http.post(this.url+'ventas',venta);
  }

  filtrarProductos(term: string): Observable<Product[]> {
    return this._http.get<Product[]>(this.url+'producto/'+term);
  }

  getVentasByFecha(fechaInicio?:Date, fechaFin?:Date):Observable<any>{
    
    let url = 'http://localhost:8080/api/ventas/fechas';
    if(fechaInicio != null && fechaFin != null){
      url += `?fecha1=${fechaInicio}&fecha2=${fechaFin}`;
    }
    return this._http.get<any>(url);
    
  }

  //Cambiar estado de la venta
  updateVenta(ventaId:number, nuevoEstado:string):Observable<Venta>{
    return this._http.put<Venta>('http://localhost:8080/api/ventas/' + ventaId + '/cambiarEstado?nuevoEstado=' + nuevoEstado, {})

  }
 
  
  
}
