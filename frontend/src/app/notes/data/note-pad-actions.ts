import { Action } from '@ngrx/store';
import {NotePad} from "./model/note-pad.model";

export const NOTEPAD_CREATION_INIT = 'NOTEPAD_CREATION_INIT';
export const NOTEPAD_CREATION_DISPOSE = 'NOTEPAD_CREATION_DISPOSE';
export const NOTEPAD_RESET_CREATED = 'NOTEPAD_RESET_CREATED';
export const NOTEPAD_CREATE_START = 'NOTEPAD_CREATE_START';
export const NOTEPAD_CREATE_SUCCESS = 'NOTEPAD_CREATE_SUCCESS';
export const NOTEPAD_CREATE_ERROR = 'NOTEPAD_CREATE_ERROR';

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

export class NotePadListLoadSuccess implements Action {
  readonly type = NOTEPAD_LIST_LOAD_SUCCESS;

  constructor(public list: Array<NotePad>, totalNumber: number) {}
}

export class NotePadListLoadError implements Action
{
  readonly type = NOTEPAD_LIST_LOAD_ERROR;

  constructor(public errors: Object) {}
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
;
