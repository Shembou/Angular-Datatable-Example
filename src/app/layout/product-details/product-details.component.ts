import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
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
    this.productsService.getProductById(id).subscribe({
      next: (data:Product) => {
        this.product = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  return() {
    this.router.navigate(['products']);
  }
}
