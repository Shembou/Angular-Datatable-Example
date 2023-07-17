import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit, OnInit {

  headers: string[] = ['name', 'quantity']
  @Input() products: Product[]
  dataSource: MatTableDataSource<Product> = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}