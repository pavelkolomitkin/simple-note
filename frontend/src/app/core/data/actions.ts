import { Action } from '@ngrx/store';
import {NotifyMessage} from "./model/notify-message.model";

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export const GLOBAL_NOTIFY_SUCCESS_MESSAGE = 'GLOBAL_NOTIFY_SUCCESS_MESSAGE';
export const GLOBAL_NOTIFY_ERROR_MESSAGE = 'GLOBAL_NOTIFY_ERROR_MESSAGE';

export class GlobalProgressShow implements Action
{
  readonly type = GLOBAL_PROGRESS_SHOW;
}

export class GlobalProgressHide implements Action
{
  readonly type = GLOBAL_PROGRESS_HIDE;

  constructor(public force: boolean = false) {}
}

export class GlobalNotifySuccessMessage implements Action
{
  readonly type = GLOBAL_NOTIFY_SUCCESS_MESSAGE;

  constructor(public message: NotifyMessage) {}
}

export class GlobalNotifyErrorMessage implements Action
{
  readonly type = GLOBAL_NOTIFY_ERROR_MESSAGE;

  constructor(public message: NotifyMessage) {}
}

export type CoreActions =
    GlobalProgressShow
    | GlobalProgressHide

    | GlobalNotifySuccessMessage
    | GlobalNotifyErrorMessage
  ;
