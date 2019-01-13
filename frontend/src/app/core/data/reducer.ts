import * as actions from './actions';

export interface State {
  globalProgressLoaders: number;
}

const initialState: State = {
  globalProgressLoaders: 0
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

      if (action.force || (state.globalProgressLoaders == 1))
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

    default:

      return state;

  }

}
