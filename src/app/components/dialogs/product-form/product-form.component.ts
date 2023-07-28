import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Options } from 'src/app/model/options';
import { Product } from 'src/app/model/product';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  statuses: Options[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | any,
    private httpRequestsService: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.setOptions();
  }

  createFormGroup() {
    this.form = new FormGroup ({
      id: new FormControl(this.data?.id || null),
      name: new FormControl(this.data?.name || null),
      quantity: new FormControl(this.data?.quantity || null),
      availability: new FormControl(this.data?.availability || null),
      status: new FormControl(this.data?.status || null),
      description: new FormControl(this.data?.description || null),
      price: new FormControl(this.data?.price || null)
    });
  }

  setOptions() {
    this.statuses = [
      {value: 0, name: 'Delivered'},
      {value: 1, name: 'Traveling'},
      {value: 2, name: 'Pending'},
      {value: 3, name: 'Cancelled'},
      {value: 4, name: 'On Hold'},
      {value: 5, name: 'Returned'}
    ]
  }
  

  update() {
    const data = this.getFormValues();
    this.httpRequestsService.post('/products', data).subscribe({
      next:(data: any) => {
        if(data.errorMessage) {
          console.log(data.errorMessage);
        } else {
          console.log(data.message);
          this.dialogRef.close(true);
        }
      }
    });
  }

  getFormValues() {
    const product: Product = this.form.value;
    if (product.id == null) {
      const {id, ...productWithoutId} = product;
      return productWithoutId;
    } else {
      return product;
    }
  }

  exit() {
    this.dialogRef.close(false);
  }
}
