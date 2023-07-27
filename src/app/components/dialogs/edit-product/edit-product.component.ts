import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Options } from 'src/app/model/options';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{

  statuses: Options[];
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.setOptions();
  }

  createFormGroup() {
    this.form = new FormGroup ({
      name: new FormControl(this.data.name),
      quantity: new FormControl(this.data.quantity),
      availability: new FormControl(this.data.availability),
      status: new FormControl(this.data.status),
      description: new FormControl(this.data.description),
      price: new FormControl(this.data.price),
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

    this.dialogRef.close();
  }

  exit() {
    this.dialogRef.close();
  }
}
