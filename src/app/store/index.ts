import { ActionReducerMap } from "@ngrx/store";
import { counterFeatureKey, counterReducer } from "./counter.reducer";


export const appReducer: ActionReducerMap<any> = {
  [counterFeatureKey]: counterReducer
}
