import * as actions from './note-pad-actions';
import {NotePadActions} from "./note-pad-actions";
import {NotePad} from "./model/note-pad.model";

export interface State {
  createdNotePad: NotePad;
  createNotePadErrors: Object;

  initCreation: Boolean;

  list: Array<NotePad>;
  listErrors: Object;
}

const initialState: State = {
  createdNotePad: null,
  createNotePadErrors: {},

  initCreation: false,

  list: [],
  listErrors: {}
};

export function reducer(state: State = initialState, action: NotePadActions) {

  switch (action.type) {

    case actions.NOTEPAD_CREATE_SUCCESS:

      return {
        ...state,
        createdNotePad: action.notePad,
        createNotePadErrors: {}
      };

    case actions.NOTEPAD_CREATE_ERROR:

      return {
        ...state,
        createdNotePad: null,
        createNotePadErrors: action.errors
      };

    case actions.NOTEPAD_CREATION_INIT:

      return {
        ...state,
        createdNotePad: null,
        createNotePadErrors: {},
        initCreation: true
      };

    case actions.NOTEPAD_CREATION_DISPOSE:

      return {
        ...state,
        initCreation: false
      };

    case actions.NOTEPAD_RESET_CREATED:

      return {
        ...state,
        createdNotePad: null,
        createNotePadErrors: {},
      };

    case actions.NOTEPAD_LIST_LOAD_SUCCESS:

      return {
        ...state,
        list: action.list,
        listErrors: {}
      };

    case actions.NOTEPAD_LIST_LOAD_ERROR:

      return {
        ...state,
        list: [],
        listErrors: action.errors
      };

    default:

      return state;
  }

}
