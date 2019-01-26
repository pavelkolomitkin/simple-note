import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {
  USER_REGISTER_START, USER_REGISTER_SUCCESS,
  USER_REGISTRATION_CONFIRM_START, USER_REGISTRATION_CONFIRM_SUCCESS,
  UserRegistrationConfirmError,
  UserRegistrationConfirmStart,
  UserRegistrationConfirmSuccess,
  UserRegistrationError,
  UserRegistrationStart,
  UserRegistrationSuccess
} from '../actions';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {SecurityService} from '../../services/security.service';
import User from '../../../core/model/user.model';
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Router} from "@angular/router";
import {State} from "../../../app.state";

@Injectable()
export class RegisterEffects {

  @Effect()
  registerStart: Observable<Action> = this.actions.pipe(
    ofType(USER_REGISTER_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: UserRegistrationStart) => {

      const { data } = action;

      return this.service.registerUser(data).pipe(
        map((user: User) => {
          return new UserRegistrationSuccess(user);
        }),
        catchError((errors) => {
          return of(new UserRegistrationError(errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect({ dispatch: false })
  registerSuccessful: Observable<Action> = this.actions.pipe(
    ofType(USER_REGISTER_SUCCESS),
    tap((action: UserRegistrationSuccess) => {
      this.router.navigate(['/security', 'register-success']);
    })
  );

  @Effect()
  confirmRegisterStart: Observable<Action> = this.actions.pipe(
    ofType(USER_REGISTRATION_CONFIRM_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: UserRegistrationConfirmStart) => {

      const { confirmationKey } = action;

      return this.service.registerConfirm(confirmationKey).pipe(
        map((user: User) => {
          return new UserRegistrationConfirmSuccess(user);
        }),
        catchError((errors) => {
          return of(new UserRegistrationConfirmError(errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  constructor(
    private actions: Actions,
    private service: SecurityService,
    private store: Store<State>,
    private router: Router
  ) {}

}
