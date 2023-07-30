import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProductComponent } from '../components/dialogs/delete-product/delete-product.component';
import { ProductFormComponent } from '../components/dialogs/product-form/product-form.component';
import { Product } from '../model/product';
import { HttpRequestsService } from './http-requests.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpRequestsService: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  getStatusName(status: number): string {
    const mappedStatuses: { [key: number]: string } = {
      0: 'Delivered',
      1: 'Traveling',
      2: 'Pending',
      3: 'Cancelled',
      4: 'On Hold',
      5: 'Returned'
    };
    return mappedStatuses[status] || 'Unknown';
  }

  get(): Observable<Product[]> {
    return this.httpRequestsService.get("/products").pipe(
      map((data: Product[] | any) => {
        if (data.errorMessage) {
          this.toastr.error(`${data.errorMessage}`, 'Error');
          return [];
        } else {
          return data.filter((product) => product.quantity > 0);
        }
      })
    );
  }

  getById(id: number) {
    const params = new HttpParams()
    .set('id', id);
    return this.httpRequestsService.get("/products", params).pipe(
      map((data: Product[] | any) => {
        if (data.errorMessage) {
          this.toastr.error(`${data.errorMessage}`, 'Error');
        } else {
          return data[0];
        }
      })
    );
  }

  update(data: any, dialogRef: MatDialogRef<ProductFormComponent>) {
    this.httpRequestsService.post('/products', data).subscribe({
      next:(data: any) => {
        if(data.errorMessage) {
          this.toastr.error(`${data.errorMessage}`, 'Error');
          
        } else {
          this.toastr.success(`${data.message}`, 'Success');
          dialogRef.close(true);
        }
      }
    });
  }

  delete(data: Product, dialogRef: MatDialogRef<DeleteProductComponent>) {
    const params = new HttpParams()
    .set('id', data.id);
    this.httpRequestsService.delete('/products', params).subscribe({
      next: (data: any) => {
        if (data.errorMessage) {
          this.toastr.error(`${data.errorMessage}`, 'Error');
        } else {
          this.toastr.success(`${data.message}`, 'Success');
          this.router.navigate(['products']);
        }
        dialogRef.close();
      }
    });
  }
}
