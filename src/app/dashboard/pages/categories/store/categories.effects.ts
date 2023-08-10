import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { CategoriesActions } from './categories.actions';

@Injectable()
export class CategoriesEffects {


  loadCategoriess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CategoriesActions.loadCategories),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
