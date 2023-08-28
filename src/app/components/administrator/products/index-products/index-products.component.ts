import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/components/models/product';
import { ProductService } from 'src/app/components/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css']
})
export class IndexProductsComponent {

  products:Product[]=[];
  
    constructor(private productService: ProductService) {

     }

      ngOnInit(): void {
        this.getProducts();
      }

     getProducts(){
      this.productService.getAllProducts().subscribe(
        response=>{
          this.products=response;
          console.log(this.products);
        }
      );
     }
     
     delete(product: Product): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: 'Está seguro?',
          text: `Seguro que desea eliminar el Producto! ${product.nombre}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.productService.deleteProduct(product.id).subscribe((response) => {
              this.products = this.products.filter((cli) => cli !== product);
              swalWithBootstrapButtons.fire(
                'Producto Eliminado!',
                `Producto ${product.nombre} Eliminado con éxito.`,
                'success'
              );
            });
          }
        });
    }
  



}
