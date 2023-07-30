import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { pageSettings } from 'src/app/model/pageSettings';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit, OnInit, OnChanges {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() products: Product[];
  @Input() filters: FormGroup;
  filteredProducts: Product[];
  headers: string[] = ['name', 'quantity', 'status', 'price'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource;

  constructor(
    private router: Router,
    public productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.attachValueChangesListener();
    this.setUpDataSource();
  }

  ngAfterViewInit(): void {
    this.performActionsOnTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && changes['products'].currentValue) {
      this.setUpDataSource();
    }
  }

  setUpDataSource() {
    this.filteredProducts = this.products.filter(
      (product) =>
      this.isProductFiltered(product)
    );
    this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
    this.dataSource.paginator = this.paginator;
  }

  isProductFiltered(product: Product) {
    const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
    return (Number(product.status) === storedFilters.status || storedFilters.status == undefined) &&
    (storedFilters.availability === true ? product.availability === storedFilters.availability : true) &&
    ((product.name.toLowerCase().includes(storedFilters.search?.toLowerCase()) || storedFilters.search == undefined) ||
      (product.quantity.toString().toLowerCase().includes(storedFilters.search?.toLowerCase()) || storedFilters.search == undefined));
  }

  setMatTableHeight(storedFilters: any) {
    var tableElement = document.getElementsByClassName('mat-table')[0];
    tableElement.scrollTop = storedFilters.height;
  }

  performActionsOnTable() {
    const storedFilters = JSON.parse(sessionStorage.getItem('pageSettings')) || {};
    this.setMatTableHeight(storedFilters);
    this.setPaginator(storedFilters);
  }

  setPaginator(storedFilters: any) {
    setTimeout(() => {
      this.paginator.pageSize = storedFilters.size;
      this.paginator.pageIndex = storedFilters.index;
      this.dataSource.paginator = this.paginator;
    })
  }

  getMatTableHeight() {
    var tableElement = document.getElementsByClassName('mat-table')[0];
    return tableElement.scrollTop;
  }

  attachValueChangesListener() {
    this.filters.valueChanges.subscribe(() => {
      this.setUpDataSource();
    });
  }

  showDetails(row: Product) {
    this.rememberPageSettings();
    this.router.navigate(['products', row.id]);
  }

  rememberPageSettings() {
    const settings: pageSettings = {
      size: this.dataSource.paginator.pageSize,
      index: this.dataSource.paginator.pageIndex,
      height: this.getMatTableHeight()
    }
    sessionStorage.setItem('pageSettings', JSON.stringify(settings));
  }
}