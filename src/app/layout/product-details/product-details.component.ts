import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProductComponent } from 'src/app/components/dialogs/edit-product/edit-product.component';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productsService: ProductsService,
    private httpRequestsService: HttpRequestsService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const id = parseInt(this.getIdFromParams());
    this.user = this.auth.getCurrentUser();
    this.getProductById(id);
  }

  getIdFromParams() {
    return this.route.snapshot.paramMap.get('id');
  }

  getProductById(id: number) {
    const params = new HttpParams()
      .set('id', id);
    this.httpRequestsService.get("/products", params).subscribe({
      next: (data: Product[] | any) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
        } else {
          this.product = data[0];
        }
      }
    });
  }
  edit() {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: this.product,
      height: '60vh',
      width: '60vw'
    });
  }

  delete () {

  }

  return() {
    this.router.navigate(['products']);
  }
}
