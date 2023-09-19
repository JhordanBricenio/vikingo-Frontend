import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-products',
  templateUrl: './paginator-products.component.html',
  styleUrls: ['./paginator-products.component.css']
})
export class PaginatorProductsComponent implements OnInit {
  @Input() pagination: any;
  paginas: number[];
  desde: number;
  hasta: number;



  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void { 
    let paginacionActualizada = changes['pagination'];
    if(paginacionActualizada.previousValue){
      this.initPaginator();
    }
    
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.pagination.number - 4), this.pagination.totalPages - 5);
    this.hasta = Math.max(Math.min(this.pagination.totalPages, this.pagination.number + 4), 6);
    if(this.pagination.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    }else
    this.paginas = new Array(this.pagination.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }
}
