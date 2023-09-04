import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/components/models/product';
import { ProductService } from 'src/app/components/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css']
})
export class IndexProductsComponent {

  products: Product[] = [];
  public pagination: any;

  inputVacio = true;

  stateCtrl = new FormControl('');

  public nombre:any;

  constructor(private productService: ProductService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productService.getProyectsBySearch(page).subscribe((response) => {
        this.products = response.content as Product[];
        this.pagination = response;        
      });
    });
  }
  filtrar() {
    if (this.nombre != null) {  
      const isNumeric = /^[0-9]+$/.test(this.nombre);
      if(isNumeric){
        this.productService.getProyectsBySearch(0,null,this.nombre).subscribe((response) => {
          this.products = response.products as Product[];        
        }
        )
      }
      else{
        this.productService.getProyectsBySearch(0,this.nombre,null).subscribe((response) => {
          this.products = response.products as Product[];        
        })
      }
    } 
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

  reset(){
    this.ngOnInit();
  }




}
