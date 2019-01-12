import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "./core/data/reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isProgressVisible: Observable<Boolean>;

  constructor(private store: Store<State>) {

    this.isProgressVisible = this.store.pipe(select(state => (state.globalProgressLoaders > 0)));

  }
}
