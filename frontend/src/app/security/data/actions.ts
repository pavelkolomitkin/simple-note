import { Action } from '@ngrx/store';
import User from '../../core/model/user.model';
import RegisterData from './model/register-data.model';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_REGISTRATION_CONFIRM_START = 'USER_REGISTRATION_CONFIRM_START';
export const USER_REGISTRATION_CONFIRM_SUCCESS = 'USER_REGISTRATION_CONFIRM_SUCCESS';
export const USER_REGISTRATION_CONFIRM_ERROR = 'USER_REGISTRATION_CONFIRM_ERROR';

export class UserRegistrationStart implements Action
{

  readonly type = USER_REGISTER_START;

  constructor(
    public data: RegisterData
  ) {}
}

export class UserRegistrationSuccess implements Action
{
  readonly type = USER_REGISTER_SUCCESS;

  constructor(public user: User) {}
}

export class UserRegistrationError implements Action
{
  readonly type = USER_REGISTER_ERROR;

  constructor(public errors: Object) {}
}


export class UserRegistrationConfirmStart implements Action
{
  readonly type = USER_REGISTRATION_CONFIRM_START;

  constructor (public confirmationKey: string) {}
}

export class UserRegistrationConfirmSuccess implements Action
{
  readonly type = USER_REGISTRATION_CONFIRM_SUCCESS;

  constructor(public user: User) {}
}

export class UserRegistrationConfirmError implements Action
{
  readonly type = USER_REGISTRATION_CONFIRM_ERROR;

  constructor(public errors: Object) {}
}

export type SecurityActions =
          UserRegistrationStart
          | UserRegistrationSuccess
          | UserRegistrationError

          | UserRegistrationConfirmStart
          | UserRegistrationConfirmSuccess
          | UserRegistrationConfirmError
  ;
