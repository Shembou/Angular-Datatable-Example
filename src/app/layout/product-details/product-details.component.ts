import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProductComponent } from 'src/app/components/dialogs/delete-product/delete-product.component';
import { ProductFormComponent } from 'src/app/components/dialogs/product-form/product-form.component';
import { Item } from 'src/app/model/item';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
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
    private auth: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
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
    this.productsService.getById(id).subscribe((product: Product) => {
      this.product = product;
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
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getProductById(this.id);
      }
    })
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: this.product,
      height: '60vh',
      width: '60vw'
    });
  }

  addToCart() {
    const cart = this.prepareCart();
    sessionStorage.setItem('cart',JSON.stringify(cart));
    this.toastr.success(`Added ${this.product.name} to cart`, 'Success');
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
