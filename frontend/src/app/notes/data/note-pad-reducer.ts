import * as actions from './note-pad-actions';
import {NotePadActions} from "./note-pad-actions";
import {NotePad} from "./model/note-pad.model";

export interface State {
  createdNotePad: NotePad;
  createNotePadErrors: Object;
  initCreation: Boolean;

  updatedNotePad: NotePad;
  updateNotePadErrors: Object;
  editingNotePad: NotePad;
  initEdition: Boolean;

  deletingNotePad: NotePad;
  deletedNotePad: NotePad;
  deleteNotePadErrors: Object;

  list: Array<NotePad>;
  listErrors: Object;
}

const initialState: State = {
  createdNotePad: null,
  createNotePadErrors: {},
  initCreation: false,

  updatedNotePad: null,
  updateNotePadErrors: {},
  editingNotePad: null,
  initEdition: false,

  deletingNotePad: null,
  deletedNotePad: null,
  deleteNotePadErrors: {},

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

    case actions.NOTEPAD_LIST_RESET:

      return {
        ...state,
        list: [],
        listErrors: {}
      };

    case actions.NOTEPAD_EDITING_INIT:

      return {
        ...state,
        editingNotePad: action.notePad,
        updatedNotePad: null,
        updateNotePadErrors: {},
        initEdition: true
      };

    case actions.NOTEPAD_EDITING_DISPOSE:

      return {
        ...state,
        editingNotePad: null,
        initEdition: false
      };

    case actions.NOTEPAD_UPDATE_SUCCESS:

      return {
        ...state,
        updatedNotePad: action.notePad,
        updateNotePadErrors: {}
      };

    case actions.NOTEPAD_UPDATE_ERROR:

      return {
        ...state,
        updatedNotePad: null,
        updateNotePadErrors: action.errors
      };

    case actions.NOTEPAD_DELETE_INIT:

      return {
        ...state,
        deletingNotePad: action.notePad
      };

    case actions.NOTEPAD_DELETE_CANCEL:

      return {
        ...state,
        deletingNotePad: null
      };

    case actions.NOTEPAD_DELETE_SUCCESS:

      return {
        ...state,
        deletedNotePad: action.notePad,
        deleteNotePadErrors: {},
      };

    case actions.NOTEPAD_DELETE_ERROR:

      return {
        ...state,
        deletedNotePad: action.notePad,
        deleteNotePadErrors: action.errors,
      };

    default:

      return state;
  }

}
