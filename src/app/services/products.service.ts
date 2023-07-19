import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getStatusName(status: number): string {
    const mappedStatuses: { [key: number]: string} = {
      0: 'Delivered',
      1: 'Traveling',
      2: 'Pending',
      3: 'Cancelled',
      4: 'On Hold',
      5: 'Returned'
    };
    return mappedStatuses[status] || 'Unknown';
  }
}
