import * as actions from './note.actions';
import {Note} from './model/note.model';

export interface State
{
  noteList: Array<Note>;
  noteListTotal: number,
  noteListLoadErrors: Object;

  createdNote: Note;
  createNoteErrors: Object;

  updatedNote: Note;
  updateNoteErrors: Object;

  noteDetails: Note;
  noteDetailsLoadErrors: Object;

  noteDeleting: Note;

  lastDeletedNote: Note;
  lastDeleteErrors: Object;
}

const initialState: State = {

  noteList: [],
  noteListTotal: 0,
  noteListLoadErrors: {},

  createdNote: null,
  createNoteErrors: {},

  updatedNote: null,
  updateNoteErrors: {},

  noteDetails: null,
  noteDetailsLoadErrors: {},

  noteDeleting: null,

  lastDeletedNote: null,
  lastDeleteErrors: {}
};


export function reducer(state: State = initialState, action: actions.NoteActions) {

  switch (action.type) {

    case actions.NOTE_CREATE_SUCCESS:

      return {
        ...state,
        createdNote: action.note,
        createNoteErrors: {}
      };

    case actions.NOTE_CREATE_ERROR:

      return {
        ...state,
        createdNote: null,
        createNoteErrors: action.errors
      };

    case actions.NOTE_UPDATE_RESET:

      return {
        ...state,
        updatedNote: null,
        updateNoteErrors: {}
      };

    case actions.NOTE_UPDATE_SUCCESS:

      return {
        ...state,
        updatedNote: action.note,
        updateNoteErrors: {}
      };

    case actions.NOTE_UPDATE_ERROR:

      return {
        ...state,
        updatedNote: null,
        updateNoteErrors: action.errors
      };

    case actions.NOTE_DETAILS_RESET:

      return {
        ...state,
        noteDetails: null,
        noteDetailsLoadErrors: {}
      };

    case actions.NOTE_DETAILS_LOAD_SUCCESS:

      return {
        ...state,
        noteDetails: action.note,
        noteDetailsLoadErrors: {}
      };

    case actions.NOTE_DETAILS_LOAD_ERROR:

      return {
        ...state,
        noteDetails: null,
        noteDetailsLoadErrors: action.errors
      };

    case actions.NOTE_LIST_LOAD_SUCCESS:

      return {
        ...state,
        noteList: action.list,
        noteListTotal: action.total,
        noteListLoadErrors: {}
      };

    case actions.NOTE_LIST_LOAD_ERROR:

      return {
        ...state,
        noteList: [],
        noteListTotal: 0,
        noteListLoadErrors: action.errors
      };

    case actions.NOTE_DELETE_INIT:

      return {
        ...state,
        noteDeleting: action.note
      };

    case actions.NOTE_DELETE_CANCEL:

      return {
        ...state,
        noteDeleting: null
      };

    case actions.NOTE_DELETE_SUCCESS:

      return {
        ...state,
        noteDeleting: null,
        lastDeletedNote: action.note,
        lastDeleteErrors: {}
      };

    case actions.NOTE_DELETE_ERROR:

      return {
        ...state,
        lastDeletedNote: null,
        lastDeleteErrors: action.errors
      };

    default:

      return state;

  }
}
