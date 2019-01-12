import { Action } from '@ngrx/store';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export class GlobalProgressShow implements Action
{
  readonly type = GLOBAL_PROGRESS_SHOW;
}

export class GlobalProgressHide implements Action
{
  readonly type = GLOBAL_PROGRESS_HIDE;

  constructor(public force: boolean = false) {}
}

export type CoreActions =
    GlobalProgressShow
    | GlobalProgressHide
  ;
