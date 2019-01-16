import { Action } from '@ngrx/store';
import {NotePad} from "./model/note-pad.model";

export const NOTEPAD_CREATION_INIT = 'NOTEPAD_CREATION_INIT';
export const NOTEPAD_CREATION_DISPOSE = 'NOTEPAD_CREATION_DISPOSE';
export const NOTEPAD_RESET_CREATED = 'NOTEPAD_RESET_CREATED';
export const NOTEPAD_CREATE_START = 'NOTEPAD_CREATE_START';
export const NOTEPAD_CREATE_SUCCESS = 'NOTEPAD_CREATE_SUCCESS';
export const NOTEPAD_CREATE_ERROR = 'NOTEPAD_CREATE_ERROR';

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




export type NotePadActions = NotePadCreateStart
                | NotePadCreateSuccess
                | NotePadCreateError
                | NotePadResetCreated
                | NotePadCreationInit
                | NotePadCreationDispose
;
