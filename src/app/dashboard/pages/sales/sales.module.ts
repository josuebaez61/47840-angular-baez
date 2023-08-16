import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SaleEffects } from './store/sale.effects';
import { StoreModule } from '@ngrx/store';
import { saleFeature } from './store/sale.reducer';
import { SaleDialogComponent } from './components/sale-dialog/sale-dialog.component';

@NgModule({
  declarations: [SalesComponent, SaleDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    SalesRoutingModule,
    StoreModule.forFeature(saleFeature),
    EffectsModule.forFeature([SaleEffects])
  ],
})
export class SalesModule {}
