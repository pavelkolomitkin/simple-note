import * as actions from './actions';
import {NotifyMessage} from "./model/notify-message.model";

export interface State {
  globalProgressLoaders: number;

  lastSuccessMessage: NotifyMessage;
  lastErrorMessage: NotifyMessage;
}

const initialState: State = {
  globalProgressLoaders: 0,

  lastSuccessMessage: null,
  lastErrorMessage: null
};

export function reducer(state = initialState, action: actions.CoreActions): State {

  switch (action.type) {

    case actions.GLOBAL_PROGRESS_SHOW:

      return {
        ...state,
        globalProgressLoaders: state.globalProgressLoaders + 1
      };

    case actions.GLOBAL_PROGRESS_HIDE:

      let value: number;

      if (action.force || (state.globalProgressLoaders <= 1))
      {
        value = 0;
      }
      else
      {
        value = state.globalProgressLoaders - 1;
      }

      return {
        ...state,
        globalProgressLoaders: value
      };

    case actions.GLOBAL_NOTIFY_SUCCESS_MESSAGE:

      return {
        ...state,
        lastSuccessMessage: action.message
      };

    case actions.GLOBAL_NOTIFY_ERROR_MESSAGE:

      return {
        ...state,
        lastErrorMessage: action.message
      };

    default:

      return state;

  }

}
