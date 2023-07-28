import { HttpParams } from '@angular/common/http';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteProductComponent } from 'src/app/components/dialogs/delete-product/delete-product.component';
import { ProductFormComponent } from 'src/app/components/dialogs/product-form/product-form.component';
import { Item } from 'src/app/model/item';
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
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  product: Product
  user: User;
  isLoggedIn: boolean;
  id: number;

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
    this.id = parseInt(this.getIdFromParams());
    this.getAuthData();
  }

  ngAfterViewInit(): void {
    this.getProductById(this.id);
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

  getAuthData() {
    this.user = this.auth.getCurrentUser();
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  edit() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: this.product,
      height: '60vh',
      width: '60vw'
    });
    //refresh page
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getProductById(this.id);
      }
    })
  }

  delete () {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: this.product,
      height: '60vh',
      width: '60vw'
    });
  }

  addToCart() {
    const cart = this.prepareCart();
    sessionStorage.setItem('cart',JSON.stringify(cart));
  }

  prepareCart() {
    const cart = this.getCart();
    let item: Item = {
      userId: this.user.id,
      product: this.product
    }
    cart.push(item);
    return cart;
  }

  getCart() {
    return JSON.parse(sessionStorage.getItem('cart')) || [];
  }

  return() {
    this.router.navigate(['products']);
  }
}
