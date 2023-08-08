import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterActions } from 'src/app/store/counter.actions';
import { selectCounterState, selectCounterStateValue } from 'src/app/store/counter.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  public value$: Observable<number>;

  constructor(private store: Store) {
    // this.store.subscribe({
    //   next: (v) => console.log('store', v)
    // })

    // this.store.select(selectCounterState).subscribe({
    //   next: (v) => console.log('selectCounterState', v)
    // })

    // this.store.select(selectCounterStateValue).subscribe({
    //   next: (v) => {
    //     console.log('selectCounterStateValue', v);
    //     this.value = v;
    //   },
    // })
    this.value$ = this.store.select(selectCounterStateValue);
  }

  onIncrement(): void {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }
}
