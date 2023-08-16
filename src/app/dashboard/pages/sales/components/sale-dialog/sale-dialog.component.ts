import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SaleActions } from '../../store/sale.actions';
import { Buyer } from '../../../buyers/models';
import { selectBuyerOptions, selectProductOptions } from '../../store/sale.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../../products/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sale-dialog',
  templateUrl: './sale-dialog.component.html',
  styles: [
  ]
})
export class SaleDialogComponent implements OnInit {

  productIdControl = new FormControl(null, Validators.required);
  buyerIdControl = new FormControl(null, Validators.required);

  saleForm = new FormGroup({
    productId: this.productIdControl,
    buyerId: this.buyerIdControl,
  });

  buyerOptions$: Observable<Buyer[]>;
  productOptions$: Observable<Product[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<SaleDialogComponent>) {
    this.buyerOptions$ = this.store.select(selectBuyerOptions);
    this.productOptions$ = this.store.select(selectProductOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadProductOptions());
    this.store.dispatch(SaleActions.loadBuyerOptions());
  }

  onSubmit(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
    } else {
      this.store.dispatch(SaleActions.createSale({ payload: this.saleForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
