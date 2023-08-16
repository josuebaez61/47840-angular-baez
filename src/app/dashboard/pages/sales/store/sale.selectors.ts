import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSale from './sale.reducer';

export const selectSaleState = createFeatureSelector<fromSale.State>(
  fromSale.saleFeatureKey
);


export const selectSales = createSelector(selectSaleState, (state) => state.data)

export const selectBuyerOptions = createSelector(selectSaleState, (state) => state.buyerOptions)
export const selectProductOptions = createSelector(selectSaleState, (state) => state.productOptions)
