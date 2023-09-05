import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, flatMap, map, startWith } from 'rxjs';
import { DVenta } from 'src/app/components/models/d-venta';
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
    { value: 'Pagada', viewValue: 'Pagada' }
  ];

  venta: Venta;

  value = '';
  hideRequiredControl = new FormControl(false);

  constructor(private ventaService: VentaService, private snack: MatSnackBar, 
    private activatedRoute: ActivatedRoute) {
    this.venta = new Venta();
  }


  ngOnInit() {

    this.initData();
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.ventaService.getVentaById(id).subscribe((venta) => this.venta = venta);
      }
    });

  }

  initData() {
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
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Product;
    console.log(producto);
    const stockNumero = parseFloat(producto.stock);
    if (stockNumero <= 0) {
      // Muestra una alerta con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Stock Insuficiente',
        text: 'No puedes agregar un producto con stock igual o menor a cero.',
      });
      this.autocompleteControl.setValue('');
      return;
    }
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new DVenta();
      nuevoItem.producto = producto;
      this.venta.dventas.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    //Si la cantidad es mayor al stock
    let producto = this.venta.dventas.filter((item: DVenta) => id === item.producto.id)[0];
    const stockNumero = parseFloat(producto.producto.stock);
    if (cantidad > stockNumero) {
      Swal.fire({
        icon: 'error',
        title: 'Stock Insuficiente',
        text: `El stock disponible es de ${stockNumero}`
      });
      this.venta.dventas = this.venta.dventas.map((item: DVenta) => {
        if (id === item.producto.id) {
          item.cantidad = stockNumero;
        }
        return item;
      });
      return;
    }
    this.venta.dventas = this.venta.dventas.map((item: DVenta) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.venta.dventas.forEach((item: DVenta) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.venta.dventas = this.venta.dventas.map((item: DVenta) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.venta.dventas = this.venta.dventas.filter((item: DVenta) => id !== item.producto.id);
  }

  registro(registroForm: any) {
    if (this.venta.dventas.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }
    if (registroForm.valid && registroForm.form.valid && this.venta.dventas.length > 0) {
      console.log(this.venta);
      this.ventaService.saveVenta(this.venta).subscribe(
        response => {
          this.snack.open('Venta registrada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.venta = new Venta();
          registroForm.reset();
          Swal.fire(
            'Venta creado',
            `Venta ${response.nota} registrada con éxito!`,
            'success'
          );
        }
      );
    } else {
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
