import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getStatusName(status: number): string {
    const mappedStatuses: { [key: number]: string} = {
      0: 'Unavailable',
      1: 'Available',
      2: 'Pending',
      3: 'Cancelled',
      4: 'On Hold',
      5: 'Cancelled'
    };
    return mappedStatuses[status] || 'Unknown';
  }
}
