import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Venta } from 'src/app/components/models/venta';

@Component({
  selector: 'app-create-ventas',
  templateUrl: './create-ventas.component.html',
  styleUrls: ['./create-ventas.component.css']
})
export class CreateVentasComponent {

  venta:Venta;

  value = '';
  hideRequiredControl = new FormControl(false);

  constructor() { 
    this.venta=new Venta();
  }



  registro(registroForm){

  }

}
