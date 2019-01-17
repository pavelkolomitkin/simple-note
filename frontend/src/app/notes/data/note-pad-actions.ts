import { Action } from '@ngrx/store';
import {NotePad} from "./model/note-pad.model";

export const NOTEPAD_CREATION_INIT = 'NOTEPAD_CREATION_INIT';
export const NOTEPAD_CREATION_DISPOSE = 'NOTEPAD_CREATION_DISPOSE';
export const NOTEPAD_RESET_CREATED = 'NOTEPAD_RESET_CREATED';
export const NOTEPAD_CREATE_START = 'NOTEPAD_CREATE_START';
export const NOTEPAD_CREATE_SUCCESS = 'NOTEPAD_CREATE_SUCCESS';
export const NOTEPAD_CREATE_ERROR = 'NOTEPAD_CREATE_ERROR';

export const NOTEPAD_EDITING_INIT = 'NOTEPAD_EDITING_INIT';
export const NOTEPAD_EDITING_DISPOSE = 'NOTEPAD_EDITING_DISPOSE';
export const NOTEPAD_UPDATE_START = 'NOTEPAD_UPDATE_START';
export const NOTEPAD_UPDATE_SUCCESS = 'NOTEPAD_UPDATE_SUCCESS';
export const NOTEPAD_UPDATE_ERROR = 'NOTEPAD_UPDATE_ERROR';

export const NOTEPAD_DELETE_INIT = 'NOTEPAD_DELETE_INIT';
export const NOTEPAD_DELETE_CANCEL = 'NOTEPAD_DELETE_CANCEL';
export const NOTEPAD_DELETE_START = 'NOTEPAD_DELETE_START';
export const NOTEPAD_DELETE_SUCCESS = 'NOTEPAD_DELETE_SUCCESS';
export const NOTEPAD_DELETE_ERROR = 'NOTEPAD_DELETE_ERROR';

export const NOTEPAD_LIST_LOAD_START = 'NOTEPAD_LIST_LOAD_START';
export const NOTEPAD_LIST_LOAD_SUCCESS = 'NOTEPAD_LIST_LOAD_SUCCESS';
export const NOTEPAD_LIST_LOAD_ERROR = 'NOTEPAD_LIST_LOAD_ERROR';

export class NotePadCreateStart implements Action
{
  readonly type = NOTEPAD_CREATE_START;

  constructor(public notePad: NotePad) {}
}

export class NotePadCreateSuccess implements Action
{
  readonly type = NOTEPAD_CREATE_SUCCESS;

  constructor(public notePad: NotePad) {}
}

export class NotePadResetCreated implements Action
{
  readonly type = NOTEPAD_RESET_CREATED;
}

export class NotePadCreateError implements Action
{
  readonly type = NOTEPAD_CREATE_ERROR;

  constructor(public errors: Object) {}
}

export class NotePadCreationInit implements Action
{
  readonly type = NOTEPAD_CREATION_INIT;

}

export class NotePadCreationDispose implements Action
{
  readonly type = NOTEPAD_CREATION_DISPOSE;
}


export class NotePadListLoadStart implements Action
{
  readonly type = NOTEPAD_LIST_LOAD_START;

  constructor(public page: number = 1, public params: Object = {}) {}
}

export class NotePadListLoadSuccess implements Action
{
  readonly type = NOTEPAD_LIST_LOAD_SUCCESS;

  constructor(public list: Array<NotePad>, totalNumber: number) {}
}

export class NotePadListLoadError implements Action
{
  readonly type = NOTEPAD_LIST_LOAD_ERROR;

  constructor(public errors: Object) {}
}

export class NotePadEditingInit implements Action
{
  readonly type = NOTEPAD_EDITING_INIT;

  constructor(public notePad: NotePad) {}
}

export class NotePadEditingDispose implements Action
{
  readonly type = NOTEPAD_EDITING_DISPOSE;
}

export class NotePadUpdateStart implements Action
{
  readonly type = NOTEPAD_UPDATE_START;

  constructor(public notePad: NotePad) {}
}

export class NotePadUpdateSuccess implements Action
{
  readonly type = NOTEPAD_UPDATE_SUCCESS;

  constructor(public notePad: NotePad) {}
}


export class NotePadUpdateError implements Action
{
  readonly type = NOTEPAD_UPDATE_ERROR;

  constructor(public errors: Object) {}
}

export class NotePadDeleteInit implements Action
{
  readonly type = NOTEPAD_DELETE_INIT;

  constructor(public notePad: NotePad) {}
}

export class NotePadDeleteCancel implements Action
{
  readonly type = NOTEPAD_DELETE_CANCEL;
}

export class NotePadDeleteStart implements Action
{
  readonly type = NOTEPAD_DELETE_START;

  constructor(public notePad: NotePad) {}
}

export class NotePadDeleteSuccess implements Action
{
  readonly type = NOTEPAD_DELETE_SUCCESS;

  constructor(public notePad: NotePad) {}
}


export class NotePadDeleteError implements Action
{
  readonly type = NOTEPAD_DELETE_ERROR;

  constructor(public notePad: NotePad, public errors: Object) {}
}


export type NotePadActions = NotePadCreateStart
                | NotePadCreateSuccess
                | NotePadCreateError
                | NotePadResetCreated
                | NotePadCreationInit
                | NotePadCreationDispose

                | NotePadListLoadStart
                | NotePadListLoadSuccess
                | NotePadListLoadError

                | NotePadEditingInit
                | NotePadEditingDispose
                | NotePadUpdateStart
                | NotePadUpdateSuccess
                | NotePadUpdateError

                | NotePadDeleteInit
                | NotePadDeleteCancel
                | NotePadDeleteStart
                | NotePadDeleteSuccess
                | NotePadDeleteError
;
