import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../app.state';
import {UserRegistrationStart} from "../data/actions";
import RegisterData from "../data/model/register-data.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  errorSubscription: Subscription;

  errors: {} = {};

  constructor(private store:Store<State>) {
    this.errorSubscription = store.pipe(select(state => state.security.registerUserErrors)).subscribe((errors) => {
      this.errors = errors;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }


  onFormSubmit(data:RegisterData)
  {
    this.store.dispatch(new UserRegistrationStart(data));
  }

}
