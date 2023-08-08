import { ActionReducerMap } from "@ngrx/store";
import { CounterState, counterFeatureKey, counterReducer } from "./counter.reducer";
import { AuthState, authFeatureKey, authReducer } from "./auth/auth.reducer";

export interface AppState {
  [counterFeatureKey]: CounterState;
  [authFeatureKey]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [counterFeatureKey]: counterReducer,
  [authFeatureKey]: authReducer,
}
