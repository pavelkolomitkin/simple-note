import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../app.state';
import User from '../../core/model/user.model';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import LoginCredentials from '../data/model/login-credentials.model';
import {UserLoginStart} from '../data/actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  authUserSubscription: Subscription;

  loginErrorSubscription: Subscription;

  errors: Observable<Object>;

  constructor(private store: Store<State>, private router: Router)
  {
    this.authUserSubscription = store.pipe(select(state => state.security.authorizedUser)).subscribe(
      (user: User) => {
        if (user !== null)
        {
          this.router.navigate(['/note', 'list']);
        }
      }
    );

    this.errors = store.pipe(select(state => state.security.loginErrors));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
    //this.loginErrorSubscription.unsubscribe();
  }

  onFormSubmit(credentials: LoginCredentials)
  {
    this.store.dispatch(new UserLoginStart(credentials));
  }

}
