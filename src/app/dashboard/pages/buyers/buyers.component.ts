import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuyerService } from './services/buyer.service';
import { Observable } from 'rxjs';
import { Buyer } from './models';
import { MatDialog } from '@angular/material/dialog';
import { BuyerDialogComponent } from './components/buyer-dialog/buyer-dialog.component';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styles: [],
})
export class BuyersComponent implements OnInit, OnDestroy {
  buyers$: Observable<Buyer[]>;
  displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];

  constructor(private buyersService: BuyerService, private dialog: MatDialog) {
    this.buyers$ = this.buyersService.buyers$;
  }
  ngOnDestroy(): void {
    this.buyersService.clearBuyers();
  }

  ngOnInit(): void {
    this.buyersService.loadBuyers();
  }

  onCreate(): void {
    this.dialog.open(BuyerDialogComponent);
  }
  onDelete(id: number): void {
    this.buyersService.deleteBuyerById(id);
  }
}
