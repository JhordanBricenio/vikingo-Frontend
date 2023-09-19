import { Component } from '@angular/core';
import { Venta } from 'src/app/components/models/venta';
import { ModalService } from 'src/app/components/services/modal.service';
import {  Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/components/services/venta.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent {


  venta:Venta;
  public title:string = 'Detalle de la venta';
  public fotoSeleccionada:File;
  progreso:number = 0;
  gananciaTotal:number = 0;

  constructor(private ventaService:VentaService, private activatedRoute:ActivatedRoute ) { 

    this.venta = new Venta();
  }

  ngOnInit(): void {

    this.init_data();
    
  }
  init_data(){
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.ventaService.getVentaById(id).subscribe(
            response => {
              this.venta = response;
              console.log(this.venta);
              
              this.gananciaTotal = 0;
              this.venta.dventas.forEach(element => {
                this.gananciaTotal += element.ganancia;
                               
              } );
            }
          );
        }
      }
    );

  }
  

  

}
