import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url;
  
  constructor(private _http: HttpClient) {
    this.url=GLOBAL.url;
  }
  getAllProducts():Observable<Product[]>{
    return this._http.get<Product[]>(this.url+'producto');
  }
  save(course:Product):Observable<any>{
    return this._http.post<any>(this.url+'producto', course);

  }
    getProductsId(id):Observable<Product>{
      return this._http.get<Product>(this.url+'producto/'+id);
    }
  
    updateProducts(product:Product):Observable<any>{
      return this._http.put(this.url+'producto/'+product.id,product);
    }
  
    deleteProduct(id):Observable<any>{
      return this._http.delete(this.url+'producto/'+id);
    }

  
}
