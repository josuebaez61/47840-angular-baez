import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuyersComponent } from './buyers.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BuyersComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BuyersRoutingModule {}
