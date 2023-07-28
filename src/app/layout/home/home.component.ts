import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from 'src/app/components/dialogs/product-form/product-form.component';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  products: Product[]
  filters: FormGroup;
  user: User;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
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
