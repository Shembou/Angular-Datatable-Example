import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit, OnInit {

  headers: string[] = ['name', 'quantity', 'status']
  @Input() products: Product[]
  dataSource: MatTableDataSource<Product> = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private router: Router,
    public productsService: ProductsService
    ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetails(row: Product) {
    this.router.navigate(['products', row.id]);
  }
}