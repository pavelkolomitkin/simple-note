import * as actions from './actions';
import RegisterData from './model/register-data.model';
import User from '../../core/model/user.model';

export interface State {
  registerInputData: RegisterData,
  registeredUser: User,
  registerUserErrors: Object,

  confirmationKey: string,
  confirmedUser: User,
  confirmationUserErrors: Object
}

const initialState: State = {
  registerInputData: null,
  registeredUser: null,
  registerUserErrors: {},

  confirmationKey: null,
  confirmedUser: null,
  confirmationUserErrors: {}
};


export function reducer(state = initialState, action: actions.SecurityActions): State {

  switch (action.type) {

    case actions.USER_REGISTER_START:

      return {
        ...state,
        registerInputData: action.data
      };

    case actions.USER_REGISTER_SUCCESS:

      return {
        ...state,
        registeredUser: action.user,
        registerUserErrors: {}
      };

    case actions.USER_REGISTER_ERROR:

      return {
        ...state,
        registeredUser: null,
        registerUserErrors: action.errors
      };

    case actions.USER_REGISTRATION_CONFIRM_START:

      return {
        ...state,
        confirmationKey: action.confirmationKey
      };


    case actions.USER_REGISTRATION_CONFIRM_SUCCESS:

      return {
        ...state,
        confirmedUser: action.user,
        confirmationUserErrors: {}
      };

    case actions.USER_REGISTRATION_CONFIRM_ERROR:

      return {
        ...state,
        confirmedUser: null,
        confirmationUserErrors: action.errors
      };

    default:

      return state;

  }
}
