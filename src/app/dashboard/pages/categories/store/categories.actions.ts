import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CategoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Load Categories': emptyProps(),
    'Load Category Detail': props<{ categoryId: number }>(),

  }
});
