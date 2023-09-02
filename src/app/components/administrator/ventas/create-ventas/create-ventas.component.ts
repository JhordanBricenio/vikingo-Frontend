import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, flatMap, map, startWith } from 'rxjs';
import { Product } from 'src/app/components/models/product';
import { Venta } from 'src/app/components/models/venta';
import { VentaService } from 'src/app/components/services/venta.service';
import Swal from 'sweetalert2';

interface MetodoPago {
  value: string;
  viewValue: string;
}

interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-ventas',
  templateUrl: './create-ventas.component.html',
  styleUrls: ['./create-ventas.component.css']
})
export class CreateVentasComponent {

  autocompleteControl = new FormControl('');
  productosFiltrados: Observable<Product[]>;



  metodo: MetodoPago[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Yape', viewValue: 'Yape' },
    { value: 'Credito', viewValue: 'Credito' }

  ];

  estado: Estado[] = [
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Pagado', viewValue: 'Pagado' },
    { value: 'Cancelado', viewValue: 'Cancelado' }
  ];

  venta:Venta;

  value = '';
  hideRequiredControl = new FormControl(false);

  constructor(private ventaService:VentaService, private snack:MatSnackBar, private productoService:VentaService) { 
    this.venta=new Venta();
  }

  
  ngOnInit() {

this.initData();
    
  }

  initData(){
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map(value => {
        if (typeof value === 'string') {
          return value; // Si es una cadena, simplemente devuélvela
        } else if (typeof value === 'object' && value !== null && 'nombre' in value) {
          return (value as any).nombre; // Usamos 'as any' para indicar que confiamos en que 'nombre' existe
        } else {
          return ''; // En otros casos, puedes devolver un valor predeterminado o lanzar un error
        }
      }),
      flatMap(value => value ? this.filter(value) : [])
    );
    
  }
  mostrarNombre(producto?: Product): string | undefined {
    return producto ? producto.nombre : undefined;
  }





  registro(registroForm: any) {
    if (registroForm.valid) {
      this.ventaService.saveVenta(this.venta).subscribe(
        response => {
          this.snack.open('Venta registrada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.venta = new Venta();
          registroForm.reset();
          Swal.fire(
            'Venta creado',
            `Venta ${response.nombre} registrada con éxito!`,
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

  private filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.ventaService.filtrarProductos(filterValue);
  }

}
