import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/components/models/product';
import { ProductService } from 'src/app/components/services/product.service';

@Component({
  selector: 'app-detalle-products',
  templateUrl: './detalle-products.component.html',
  styleUrls: ['./detalle-products.component.css']
})
export class DetalleProductsComponent {

  producto:Product

  constructor(private productService:ProductService ,private activatedRoute:ActivatedRoute) { 
    this.producto = new Product();
  }

  ngOnInit(): void {
    this.initData();
  }
  initData(){
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.productService.getProductsId(id).subscribe(
            response => {
              this.producto = response;
              console.log(response);

              
            }
          );
        }
      }
    );
  }

}
