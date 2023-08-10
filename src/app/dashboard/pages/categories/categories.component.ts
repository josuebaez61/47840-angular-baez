import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from './store/categories.actions';
import { Observable } from 'rxjs';
import { Category } from './models';
import { selectCategoriesArray, selectCategoriesState } from './store/categories.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private store: Store) {
    this.categories$ = this.store.select(selectCategoriesArray);
  }

  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategories())
  }

}
