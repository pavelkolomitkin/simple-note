import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {UserRegistrationConfirmStart} from "../data/actions";
import {Subscription} from "rxjs";
import User from "../../core/model/user.model";
import {isArray} from "util";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  confirmationSubscription: Subscription;
  confirmationErrorSubscription: Subscription;

  activatedUser: User;
  activationErrors;

  constructor(
    private store:Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.confirmationSubscription = store.pipe(select(state => state.security.confirmedUser)).subscribe(
      (user: User) => {
        this.activatedUser = user;
      }
      );

    this.confirmationErrorSubscription = store.pipe(select(state => state.security.confirmationUserErrors)).subscribe(
      (errors: Object) => {
        if (isArray(errors['key']))
        {
          this.activationErrors = errors['key'][0];
        }

      }
    );
  }

  ngOnInit() {

    this.routeSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new UserRegistrationConfirmStart(params['key']));

    });
  }

  ngOnDestroy(): void {

    this.routeSubscription.unsubscribe();
    this.confirmationSubscription.unsubscribe();
  }

}
