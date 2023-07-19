import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../model/product';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.appConfigService.apiBaseUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get(this.appConfigService.apiBaseUrl).pipe(
      map((data: Product[]) => data.find(product => product.id === id))
    );
  }
}
