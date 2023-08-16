import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaleActions } from './store/sale.actions';
import { SaleWithProductAndBuyer } from './models';
import { selectSales } from './store/sale.selectors';
import { MatDialog } from '@angular/material/dialog';
import { SaleDialogComponent } from './components/sale-dialog/sale-dialog.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [],
})
export class SalesComponent implements OnInit {
  displayedColumns = ['id', 'product', 'buyer', 'total'];
  sales$: Observable<SaleWithProductAndBuyer[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.sales$ = this.store.select(selectSales)
  }

  onAdd(): void {
    this.matDialog.open(SaleDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadSales())
  }
}
