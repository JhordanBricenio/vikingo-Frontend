import { Component, Input } from '@angular/core';

@Component({
  selector: 'paginator-products',
  templateUrl: './paginator-products.component.html',
  styleUrls: ['./paginator-products.component.css']
})
export class PaginatorProductsComponent {
  @Input() pagination: any;
  paginas: number[];
  constructor() { }

  ngOnInit(): void {

    this.paginas = new Array(this.pagination.totalPages).fill(0).map((_valor, indice) => indice + 1);
    
  }
}
