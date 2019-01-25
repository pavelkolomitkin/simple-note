import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-global-progress',
  templateUrl: './global-progress.component.html',
  styleUrls: ['./global-progress.component.css']
})
export class GlobalProgressComponent implements OnInit {

  isVisible: Observable<Boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.isVisible = this.store.pipe(select(state => (state.core.globalProgressLoaders > 0)));

  }

}
