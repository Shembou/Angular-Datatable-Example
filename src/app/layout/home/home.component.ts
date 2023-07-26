import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
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
    private httpRequestsService: HttpRequestsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.httpRequestsService.get("/products").subscribe({
      next: (data: Product[] | any) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
        } else {
          this.products = data.filter((product) => product.quantity > 0);
        }
      }
    });
  }

  recieveFilters($event: any) {
    this.filters = $event;
  }
}
