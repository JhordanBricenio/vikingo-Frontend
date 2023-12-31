import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../components/models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url;

  constructor(private _http: HttpClient, private authService:AuthService) {
    this.url = GLOBAL.url;
  }
  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.url + 'producto', { headers: this.authService.agregarAuthorizationHeader() })
  }
  save(product: Product): Observable<any> {
    return this._http.post<any>(this.url + 'producto', product,  { headers: this.authService.agregarAuthorizationHeader() });

  }
  getProductsId(id): Observable<Product> {
    return this._http.get<Product>(this.url + 'producto/ver/' + id,  { headers: this.authService.agregarAuthorizationHeader() });
  }

  updateProducts(product: Product): Observable<any> {
    return this._http.put(this.url + 'producto/' + product.id, product, { headers: this.authService.agregarAuthorizationHeader() });
  }

  deleteProduct(id): Observable<any> {
    return this._http.delete(this.url + 'producto/' + id, { headers: this.authService.agregarAuthorizationHeader() });
  }

  getProyectsBySearch(page?: Number, nombre?: string, stock?: number): Observable<any> {
    let url = this.url + 'producto/buscar';

    if (nombre) {
      url += '?nombre=' + nombre;

    } else if (stock) {
      url += '?stock=' + stock;
    }

    else {
      url += '/page/' + page;
    }
    return this._http.get<any>(url,{ headers: this.authService.agregarAuthorizationHeader() } );

  }

  subirFoto(foto: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', foto);
    formData.append('id', id.toString());
    const req = new HttpRequest('POST', this.url + 'producto/upload', formData, {
       reportProgress: true,
    });
    return this._http.request(req).pipe(
       catchError(e => {
          return throwError(()=>e);
       })
    );

 }


}
