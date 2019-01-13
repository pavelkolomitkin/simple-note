import { Action } from '@ngrx/store';
import User from '../../core/model/user.model';
import RegisterData from './model/register-data.model';
import LoginCredentials from "./model/login-credentials.model";

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_REGISTRATION_CONFIRM_START = 'USER_REGISTRATION_CONFIRM_START';
export const USER_REGISTRATION_CONFIRM_SUCCESS = 'USER_REGISTRATION_CONFIRM_SUCCESS';
export const USER_REGISTRATION_CONFIRM_ERROR = 'USER_REGISTRATION_CONFIRM_ERROR';

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_INITIALIZE_START = 'USER_INITIALIZE_START';
export const USER_INITIALIZE_SUCCESS = 'USER_INITIALIZE_SUCCESS';
export const USER_INITIALIZE_ERROR = 'USER_INITIALIZE_ERROR';

export const USER_LOGOUT = 'USER_LOGOUT';

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

export class UserLoginStart implements Action
{
  readonly type = USER_LOGIN_START;

  constructor(public credentials: LoginCredentials) {}
}

export class UserLoginSuccess implements Action
{
  readonly type = USER_LOGIN_SUCCESS;

  constructor(public token: string) {}
}

export class UserLoginError implements Action
{
  readonly type = USER_LOGIN_ERROR;

  constructor(public errors: Object) {}
}

export class UserInitializeStart implements Action
{
  readonly type = USER_INITIALIZE_START;
}

export class UserInitializeSuccess implements Action
{
  readonly type = USER_INITIALIZE_SUCCESS;

  constructor(public user: User) {}
}

export class UserInitializeError implements Action
{
  readonly type = USER_INITIALIZE_ERROR;

  constructor(public errors: Object) {}
}

export class UserLogout implements Action
{
  readonly type = USER_LOGOUT;
}

export type SecurityActions =
          UserRegistrationStart
          | UserRegistrationSuccess
          | UserRegistrationError

          | UserRegistrationConfirmStart
          | UserRegistrationConfirmSuccess
          | UserRegistrationConfirmError

          | UserLoginStart
          | UserLoginSuccess
          | UserLoginError

          | UserInitializeStart
          | UserInitializeSuccess
          | UserInitializeError

          | UserLogout
  ;
