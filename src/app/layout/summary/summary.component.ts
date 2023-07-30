import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/model/item';
import { User } from 'src/app/model/user';
import { UserItem } from 'src/app/model/userItem';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  user: User;
  userItems: Item[];
  total: number;
  itemsToDisplay: any;
  columns: string[] = ['name', 'quantity'];
  dataSource: MatTableDataSource<Item[]> = new MatTableDataSource;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.userItems = this.getUserItems();
    this.total = this.calculateTotal();
    this.itemsToDisplay = this.setItemsToDisplay();
    this.dataSource = new MatTableDataSource<Item[]>(this.itemsToDisplay);
  }

  getUserItems() {
    var allItems: Item[] = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (allItems.length == 0) {
      return undefined;
    } else {
      return allItems.filter(item => item.userId == this.user.id);
    }
  }

  setItemsToDisplay(): UserItem[] {
    const uniqueItems: UserItem[] = [];

    this.userItems.forEach((userItem) => {
      const { id } = userItem.product;
      const existingItem = uniqueItems.find((item) => item.product.id === id);

      if (existingItem) {
        existingItem.product.quantity++;
      } else {
        uniqueItems.push({ ...userItem, product: { ...userItem.product, quantity: 1 } });
      }
    });

    return uniqueItems;
  }

  calculateTotal() {
    return this.userItems.reduceRight((total, item) => total + item.product.price, 0);
  }
}
