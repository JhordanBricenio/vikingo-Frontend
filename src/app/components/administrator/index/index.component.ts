import { Component } from '@angular/core';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private ventaService:VentaService) { }
  ventas:any[] = [];
  total = 0;
  cantidad:number = 0;
  List5UltimasVentas:any[] = [];


  ngOnInit(): void {

    this.ventaService.getVentasByEstado().subscribe(
      res => {
        console.log(res);
        this.ventas = res;
      }
    )

    this.ventaService.getAllVentas().subscribe(
      res => {
        this.cantidad = res.length;
        for(let i = 0; i < res.length; i++){
          if(i < 5){
            this.List5UltimasVentas.push(res[i]);
          }
          this.total += res[i].totalPagar;


        }
      })

    
      
    
    
  }

}
