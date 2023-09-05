import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/components/models/product';
import { ProductService } from 'src/app/components/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-products',
  templateUrl: './detalle-products.component.html',
  styleUrls: ['./detalle-products.component.css']
})
export class DetalleProductsComponent {

  producto:Product;
  public fotoSeleccionada:File;
  progreso:number = 0;

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

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.fotoSeleccionada = null;
    }

    }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error', 'Debe seleccionar una foto', 'error');
    }else{
      this.productService.subirFoto(this.fotoSeleccionada, this.producto.id).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.producto = response.producto as Product;
          Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
        }
      });
    }
  }

}
