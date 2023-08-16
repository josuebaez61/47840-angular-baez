import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './models';
import { ProductService } from './product.service';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  // public dataSource: Product[] = [];
  public data$: Observable<Product[]>;

  public displayedColumns = ['id', 'name', 'price', 'actions'];

  public isAdmin$: Observable<boolean>;

  constructor(private productService: ProductService, private store: Store) {
    this.data$ = this.productService.getProducts();
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // CARGO LOS PRODUCTOS
    this.productService.loadProducts();
    // // LUEGO LOS OBTENGO
    // this.productService.getProducts().subscribe({
    //   next: (data) => console.log('data: ', data),
    // });
  }

  onCreate(): void {
    this.productService.create();
  }

  onDelete(id: number): void {
    this.productService.deleteById(id);
  }
}
