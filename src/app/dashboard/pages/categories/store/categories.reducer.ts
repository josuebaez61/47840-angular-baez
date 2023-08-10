import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoriesActions } from './categories.actions';
import { Category } from '../models';
import { CATEGORIES_MOCK } from '../mocks';

export const categoriesFeatureKey = 'categories';

export interface State {
  categories: Category[]
}

export const initialState: State = {
  categories: []
};

export const reducer = createReducer(
  initialState,

  // loadCategories
  on(CategoriesActions.loadCategories, state => {
    return {
      categories: CATEGORIES_MOCK,
    }
  }),

);

export const categoriesFeature = createFeature({
  name: categoriesFeatureKey,
  reducer,
});

