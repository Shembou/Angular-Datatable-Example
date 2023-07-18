import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { HttpRequestsService } from 'src/app/services/http-requests.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[]

  constructor(
    private httpRequestsService: HttpRequestsService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.httpRequestsService.getProductWithoutDescription('/assets/dummyData/product-data.json').subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
        error: (error: any) => {
        console.log(error);
      },
    });
  }
}
