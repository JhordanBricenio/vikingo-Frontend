import { Component } from '@angular/core';
import { Venta } from 'src/app/components/models/venta';
import { VentaService } from 'src/app/components/services/venta.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent {

  ventas:Venta[]=[];

  constructor(private ventasService:VentaService) { }

  ngOnInit(): void {
    this.initData();
  }
  initData(){
    this.ventasService.getAllVentas().subscribe(
      response => {
        this.ventas=response;
      }
    );
  }

}
