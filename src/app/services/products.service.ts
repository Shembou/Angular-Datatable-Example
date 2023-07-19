import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
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

  getProductWithoutDescription(url: string): Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
      map((data: any[]) =>
        data.map(({ description, ...product }) => product)
      )
    );
  }

  getById(url: string, id: number): Observable<any> {
    return this.http.get(url).pipe(
      map((data: any[]) => data.find(product => product.id === id))
    );
  }
}
