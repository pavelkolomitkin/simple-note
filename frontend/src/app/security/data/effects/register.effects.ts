import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {
  USER_REGISTRATION_CONFIRM_START,
  UserRegistrationError,
  UserRegistrationStart,
  UserRegistrationSuccess
} from '../actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import SecurityService from '../../services/security.service';
import User from '../../../core/model/user.model';

@Injectable()
export default class RegisterEffects {

  @Effect()
  registerStart: Observable<Action> = this.actions.pipe(
    ofType(USER_REGISTRATION_CONFIRM_START),
    mergeMap((action: UserRegistrationStart) => {

      const { data } = action;

      return this.service.registerUser(data).pipe(
        map((user: User) => {
          return new UserRegistrationSuccess(user);
        }),
        catchError((errors: Object) => {
          return of(new UserRegistrationError(errors));
        })
      );
    })
  );

  constructor(
    private actions: Actions,
    private service: SecurityService
  ) {}

}
