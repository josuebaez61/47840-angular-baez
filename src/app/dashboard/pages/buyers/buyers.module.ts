import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersComponent } from './buyers.component';
import { BuyerDialogComponent } from './components/buyer-dialog/buyer-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuyersRoutingModule } from './buyers-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuyersComponent, BuyerDialogComponent],
  imports: [CommonModule, BuyersRoutingModule, SharedModule, MatDialogModule],
})
export class BuyersModule {}
