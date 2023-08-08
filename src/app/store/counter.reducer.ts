import { createReducer, on } from "@ngrx/store";
import { CounterActions } from "./counter.actions";

export const counterFeatureKey = 'counter';

const initialState = {
  value: 0
}

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (currentState) => {
    return {
      value: currentState.value + 1,
    }
  }),

  on(CounterActions.decrement, (currentState) => {
    return {
      value: currentState.value - 1,
    }
  })
);
