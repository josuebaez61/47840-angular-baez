import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState, counterFeatureKey } from "./counter.reducer";

export const selectCounterState = createFeatureSelector<CounterState>(counterFeatureKey);

export const selectCounterStateValue = createSelector(
  selectCounterState,
  (state) => state.value,
);
