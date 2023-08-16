import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateSalePayload, Sale, SaleWithProductAndBuyer } from '../models';
import { Product } from '../../products/models';
import { Buyer } from '../../buyers/models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Sales': emptyProps(),
    'Load Sales Success': props<{ data: SaleWithProductAndBuyer[] }>(),
    'Load Sales Failure': props<{ error: HttpErrorResponse }>(),

    'Load Product Options': emptyProps(),
    'Load Product Options Success': props<{ data: Product[] }>(),
    'Load Product Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Buyer Options': emptyProps(),
    'Load Buyer Options Success': props<{ data: Buyer[] }>(),
    'Load Buyer Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Sale': props<{ payload: CreateSalePayload }>(),
    'Create Sale Success': props<{ data: Sale }>(),
    'Create Sale Failure': props<{ error: HttpErrorResponse }>(),
  }
});
