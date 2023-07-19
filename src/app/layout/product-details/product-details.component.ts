import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  product: Product

  constructor(
    private route: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private router: Router,
    public productsService: ProductsService
  ) {  
  }

  ngOnInit(): void {
    const id  = parseInt(this.getIdFromParams());
    this.getProductById(id);
  }

  getIdFromParams() {
    return this.route.snapshot.paramMap.get('id');
  }

  getProductById(id: number) {
    this.httpRequestService.getById('/assets/dummyData/product-data.json', id).subscribe({
      next: (data:Product) => {
        this.product = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  return(){
    this.router.navigate(['products']);
  }
}
