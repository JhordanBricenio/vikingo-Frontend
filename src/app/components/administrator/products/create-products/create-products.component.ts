import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/components/models/categoria';
import { Marca } from 'src/app/components/models/marca';
import { Product } from 'src/app/components/models/product';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductService } from 'src/app/services/product.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {


  value = '';
  hideRequiredControl = new FormControl(false);
  selectedTipo: string = 'individual';

  product:Product;
  categorias:Categoria[];
  marcas:Marca[];



  constructor(private snack: MatSnackBar, private productService:ProductService, 
    private categoriaService:CategoriaService, private marcaService:MarcaService,
    private activateRoute:ActivatedRoute) { 
    this.product= new Product();
  }

  ngOnInit() {
    this.initData();
  }
  initData(){
    this.categoriaService.getAllCategories().subscribe(categories=>this.categorias= categories);
    this.marcaService.getAllMarcas().subscribe(
      marcas=>this.marcas= marcas
      );

    this.activateRoute.paramMap.subscribe(params=>{
      let id=+params.get('id');
      if(id){
        this.productService.getProductsId(id).subscribe(product=>{
          this.product=product;
        });
      }
    }
    );
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      if(this.product.id){
        this.update(registroForm);
      }
      this.productService.save(this.product).subscribe(
        response => {
          this.snack.open('Producto creado con éxito', 'Cerrar', {
            duration: 3000
          });
          this.product = new Product();
          registroForm.reset();
          Swal.fire(
            'Producto creado',
            `Producto ${response.nombre} creado con éxito!`,
            'success'
          );
        }
      );
    }else{
      this.snack.open('Los datos del formulario no son válidos', 'Cerrar', {
        duration: 3000
      });
    }
  }
  update(registroForm: any) {
    if (registroForm.valid) {
      this.productService.updateProducts(this.product).subscribe(
        response => {
          this.snack.open('Producto actualizado con éxito', 'Cerrar', {
            duration: 3000
          });
          this.product = new Product();
          registroForm.reset();
          Swal.fire(
            'Producto actualizado',
            `Producto ${response.nombre} actualizado con éxito!`,
            'success'
          );
        }
      );
    }else{
      this.snack.open('Los datos del formulario no son válidos', 'Cerrar', {
        duration: 3000
      });
    }
  }

  compararCategoria(o1:Categoria, o2:Categoria):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compararMarca(o1:Marca, o2:Marca):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }


}
