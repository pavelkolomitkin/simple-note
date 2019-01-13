import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  UserInitializeError,
  UserInitializeSuccess,
  UserLoginError,
  UserLoginStart,
  UserLoginSuccess
} from '../actions';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import SecurityService from '../../services/security.service';
import User from '../../../core/model/user.model';
import {State} from '../../../core/data/reducer';
import {GlobalProgressHide, GlobalProgressShow} from '../../../core/data/actions';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {error} from '@angular/compiler/src/util';


@Injectable()
export default class LoginEffects
{
  @Effect()
  loginStart: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGIN_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: UserLoginStart) => {

      const { credentials } = action;

      return this.service.login(credentials).pipe(
        map((token: string) => {
          return new UserLoginSuccess(token);
        }),
        catchError((errors) => {
          //debugger;
          return of(new UserLoginError(errors.error));
        })
      );

    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  loginSuccess: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGIN_SUCCESS),
    tap((action: UserLoginSuccess) => {
      this.localStorageService.set('token', action.token);
      this.store.dispatch(new GlobalProgressShow());
    }),

    mergeMap((action: UserLoginSuccess) => {

      return this.service.getAuthorizedUser().pipe(
        map((user: User) => {
          return new UserInitializeSuccess(user);
        }),
        catchError((errors: Object) => {
          return of(new UserInitializeError(errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    }),
    // tap((result) => {
    //   this.router.navigate(['/note', 'list']);
    // })
  );

  constructor(
    private actions: Actions,
    private service: SecurityService,
    private store: Store<State>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
}
