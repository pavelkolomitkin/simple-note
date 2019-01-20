import { Action } from '@ngrx/store';
import {Note} from "./model/note.model";

export const NOTE_CREATE_START = 'NOTE_CREATE_START';
export const NOTE_CREATE_SUCCESS = 'NOTE_CREATE_SUCCESS';
export const NOTE_CREATE_ERROR = 'NOTE_CREATE_ERROR';

export const NOTE_UPDATE_START = 'NOTE_UPDATE_START';
export const NOTE_UPDATE_SUCCESS = 'NOTE_UPDATE_SUCCESS';
export const NOTE_UPDATE_ERROR = 'NOTE_UPDATE_ERROR';

export const NOTE_DETAILS_LOAD_START = 'NOTE_DETAILS_LOAD_START';
export const NOTE_DETAILS_LOAD_SUCCESS = 'NOTE_DETAILS_LOAD_SUCCESS';
export const NOTE_DETAILS_LOAD_ERROR = 'NOTE_DETAILS_LOAD_ERROR';

export const NOTE_LIST_LOAD_START = 'NOTE_LIST_LOAD_START';
export const NOTE_LIST_LOAD_SUCCESS = 'NOTE_LIST_LOAD_SUCCESS';
export const NOTE_LIST_LOAD_ERROR = 'NOTE_LIST_LOAD_ERROR';

export const NOTE_DELETE_START = 'NOTE_DELETE_START';
export const NOTE_DELETE_SUCCESS = 'NOTE_DELETE_SUCCESS';
export const NOTE_DELETE_ERROR = 'NOTE_DELETE_ERROR';


export class NoteCreateStart implements Action
{
  readonly type = NOTE_CREATE_START;

  constructor(public note: Note) {}
}

export class NoteCreateSuccess implements Action
{
  readonly type = NOTE_CREATE_SUCCESS;

  constructor(public note: Note) {}
}

export class NoteCreateError implements Action
{
  readonly type = NOTE_CREATE_ERROR;

  constructor(public errors: Object) {}
}


export class NoteUpdateStart implements Action
{
  readonly type = NOTE_UPDATE_START;

  constructor(public note: Note) {}
}

export class NoteUpdateSuccess implements Action
{
  readonly type = NOTE_UPDATE_SUCCESS;

  constructor(public note: Note) {}
}

export class NoteUpdateError implements Action
{
  readonly type = NOTE_UPDATE_ERROR;

  constructor(public errors: Object) {}
}


export class NoteDetailsLoadStart implements Action
{
  readonly type = NOTE_DETAILS_LOAD_START;

  constructor(public id: number) {}
}

export class NoteDetailsLoadSuccess implements Action
{
  readonly type = NOTE_DETAILS_LOAD_SUCCESS;

  constructor(public note: Note) {}
}

export class NoteDetailsLoadError implements Action
{
  readonly type = NOTE_DETAILS_LOAD_ERROR;

  constructor(public errors: Object) {}
}

export class NoteListLoadStart implements Action
{
  readonly type = NOTE_LIST_LOAD_START;

  constructor(public page: number = 1, public params: Object = {}) {}
}

export class NoteListLoadSuccess implements Action
{
  readonly type = NOTE_LIST_LOAD_SUCCESS;

  constructor(public list: Array<Note>, public total: number) {}
}

export class NoteListLoadError implements Action
{
  readonly type = NOTE_LIST_LOAD_ERROR;

  constructor(public errors: Object) {}
}


export class NoteDeleteStart implements Action
{
  readonly type = NOTE_DELETE_START;

  constructor(public note: Note) {}
}

export class NoteDeleteSuccess implements Action
{
  readonly type = NOTE_DELETE_SUCCESS;

  constructor(public note: Note) {}
}

export class NoteDeleteError implements Action
{
  readonly type = NOTE_DELETE_ERROR;

  constructor(public note: Note, public errors: Object) {}
}

export type NoteActions = NoteCreateStart
                    | NoteCreateSuccess
                    | NoteCreateError

                    | NoteUpdateStart
                    | NoteUpdateSuccess
                    | NoteUpdateError

                    | NoteDetailsLoadStart
                    | NoteDetailsLoadSuccess
                    | NoteDetailsLoadError

                    | NoteListLoadStart
                    | NoteListLoadSuccess
                    | NoteListLoadError

                    | NoteDeleteStart
                    | NoteDeleteSuccess
                    | NoteDeleteError

  ;
