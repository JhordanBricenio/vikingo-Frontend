import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Venta } from '../components/models/venta';
import { Observable } from 'rxjs';
import { Product } from '../components/models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;
  
  constructor(private _http: HttpClient, private authService:AuthService) {
    this.url=GLOBAL.url;
  }
  getAllVentas():Observable<Venta[]>{
    return this._http.get<Venta[]>(this.url+'ventas',{ headers: this.authService.agregarAuthorizationHeader() });
  }

  getVentaById(id):Observable<Venta>{
    return this._http.get<Venta>(this.url+'ventas/'+id, { headers: this.authService.agregarAuthorizationHeader() });
  }

  deleteVenta(id):Observable<any>{
    return this._http.delete(this.url+'ventas/'+id, { headers: this.authService.agregarAuthorizationHeader() });
  }

  saveVenta(venta:Venta):Observable<any>{
    return this._http.post(this.url+'ventas',venta, { headers: this.authService.agregarAuthorizationHeader() });
  }

  filtrarProductos(term: string): Observable<Product[]> {
    return this._http.get<Product[]>(this.url+'producto/'+term, { headers: this.authService.agregarAuthorizationHeader() });
  }

  getVentasByFecha(fechaInicio?:Date, fechaFin?:Date):Observable<any>{
    
    let url = 'http://localhost:9090/api/ventas/fechas';
    if(fechaInicio != null && fechaFin != null){
      url += `?fecha1=${fechaInicio}&fecha2=${fechaFin}`;
    }
    return this._http.get<any>(url, { headers: this.authService.agregarAuthorizationHeader()});
    
  }

  //Cambiar estado de la venta
  updateVenta(ventaId:number, nuevoEstado:string):Observable<Venta>{
    return this._http.put<Venta>(this.url+'ventas/' + ventaId + '/cambiarEstado?nuevoEstado=' + nuevoEstado,{}, {headers: this.authService.agregarAuthorizationHeader()})
  }

  //Contar ventas por estado
  getVentasByEstado():Observable<any>{
    return this._http.get<any>(this.url+'ventas/contarVentasPorEstado', { headers: this.authService.agregarAuthorizationHeader()});
  }
 
  
  
}
