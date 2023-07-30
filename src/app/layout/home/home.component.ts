import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from 'src/app/components/dialogs/product-form/product-form.component';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  products: Product[] | any;
  filters: FormGroup;
  user: User;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.get().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getUser() {
    this.user = this.auth.getCurrentUser();
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
      height: '60vh',
      width: '60vw'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getProducts();
      }
    })
  }

  recieveFilters($event: any) {
    this.filters = $event;
  }
}
