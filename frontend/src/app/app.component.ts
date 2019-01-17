import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {State} from "./app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isProgressVisible: boolean = false;

  constructor(private store: Store<State>) {

    store.pipe(select(state => state.core.globalProgressLoaders)).subscribe((loaderNumber: number) => {
      if (loaderNumber > 0) {
        this.isProgressVisible = true;
      }
      else
      {
        this.isProgressVisible = false;
      }
    });
  }
}
