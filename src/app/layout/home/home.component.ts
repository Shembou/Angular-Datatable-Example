import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[]
  filters: FormGroup;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data.filter((product) => product.quantity > 0);
      },
        error: (error: any) => {
        console.log(error);
      },
    });
  }

  recieveFilters($event: any) {
    this.filters = $event;
  }
}
