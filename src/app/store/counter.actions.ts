import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'increment': emptyProps(),
    'decrement': emptyProps(),
  }
});
