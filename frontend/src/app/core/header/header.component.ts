import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import User from "../model/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User = null;
  userSubscription: Subscription;

  constructor(private store: Store<State>) {

    this.userSubscription = store.pipe(select(state => state.security.authorizedUser)).subscribe(
      (user: User) => {
        debugger
        this.user = user;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
