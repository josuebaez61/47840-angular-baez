import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { SaleWithProductAndBuyer } from '../models';
import { Buyer } from '../../buyers/models';
import { Product } from '../../products/models';

export const saleFeatureKey = 'sale';

export interface State {
  data: SaleWithProductAndBuyer[];
  buyerOptions: Buyer[];
  productOptions: Product[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  buyerOptions: [],
  productOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,


  // load sales
  on(SaleActions.loadSales, state => {
    return {
      ...state,
      loading: true
    }
  }),


  on(SaleActions.loadSalesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),


  on(SaleActions.loadSalesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),


  // load buyer options

  on(SaleActions.loadBuyerOptions, (state) => state),
  on(SaleActions.loadBuyerOptionsSuccess, (state, action) => {
    return {
      ...state,
      buyerOptions: action.data,
    }
  }),

  // load product options
  on(SaleActions.loadProductOptions, (state) => state),
  on(SaleActions.loadProductOptionsSuccess, (state, action) => {
    return {
      ...state,
      productOptions: action.data,
    }
  })

);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});

