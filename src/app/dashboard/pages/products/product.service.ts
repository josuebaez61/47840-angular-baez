import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  loadProducts(): void {
    // fetch ...
    /// .then((data) => this.products$.next(data))
    this.products$.next([
      {
        id: 1,
        name: 'Heladera',
        description: 'lorem ipsum',
        price: 1000,
        stock: 50,
      },
      {
        id: 2,
        name: 'Estufa',
        description: 'lorem ipsum',
        price: 500,
        stock: 25,
      },
      {
        id: 3,
        name: 'Computadora',
        description: 'lorem ipsum',
        price: 800,
        stock: 15,
      },
    ]);
  }

  create(): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: 'Random name',
            description: 'Random description',
            price: 5400,
            stock: 23,
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }
}
