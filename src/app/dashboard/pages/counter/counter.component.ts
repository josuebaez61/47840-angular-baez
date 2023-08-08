import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from 'src/app/store/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  public value = 0;

  constructor(private store: Store) {}

  onIncrement(): void {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }
}
