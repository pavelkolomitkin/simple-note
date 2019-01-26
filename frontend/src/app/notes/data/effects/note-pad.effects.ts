import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from "../../../app.state";
import {GlobalNotifySuccessMessage, GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Router} from "@angular/router";
import {
  NOTEPAD_CREATE_START, NOTEPAD_CREATE_SUCCESS,
  NOTEPAD_DELETE_START,
  NOTEPAD_DETAILS_LOAD_START,
  NOTEPAD_LIST_LOAD_START,
  NOTEPAD_UPDATE_START,
  NotePadCreateError,
  NotePadCreateStart,
  NotePadCreateSuccess,
  NotePadDeleteError,
  NotePadDeleteSuccess,
  NotePadDetailsLoadError,
  NotePadDetailsLoadStart,
  NotePadDetailsLoadSuccess,
  NotePadListLoadError,
  NotePadListLoadStart,
  NotePadListLoadSuccess,
  NotePadUpdateError,
  NotePadUpdateStart,
  NotePadUpdateSuccess
} from "../note-pad.actions";
import {NotePadService} from "../../services/note-pad.service";
import {NotePad} from "../model/note-pad.model";
import {NotifyMessage} from "../../../core/data/model/notify-message.model";

@Injectable()
export class NotePadEffects {

  @Effect()
  creationStart: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_CREATE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NotePadCreateStart) => {

      const { notePad } = action;

      return this.service.create(notePad).pipe(
        map((notePad: NotePad) => {
          return new NotePadCreateSuccess(notePad);
        }),
        catchError((errors) => {
          return of(new NotePadCreateError(errors.error.errors));
        })
      );

    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect({dispatch: false})
  successCreated: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_CREATE_SUCCESS),
    tap((action: NotePadCreateSuccess) => {
      this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('NotePad "' + action.notePad.title + '" was created!')));
    })
  );

  @Effect()
  updatingStart: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_UPDATE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NotePadUpdateStart) => {

      const { notePad } = action;

      return this.service.update(notePad).pipe(
        map((notePad: NotePad) => {
          return new NotePadUpdateSuccess(notePad);
        }),
        catchError((errors) => {
          return of(new NotePadUpdateError(errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  deletingStart: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_DELETE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NotePadDeleteSuccess) => {
      const { notePad } = action;

      return this.service.remove(notePad).pipe(
        map(() => {
          return new NotePadDeleteSuccess(notePad);
        }),
        catchError((errors) => {
          return of(new NotePadDeleteError(notePad, errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  listLoadStart: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_LIST_LOAD_START),
    tap((action: NotePadListLoadStart) => {
      if (action.page === 1)
      {
        this.store.dispatch(new GlobalProgressShow());
      }
    }),
    mergeMap((action: NotePadListLoadStart) => {

      return this.service.getList(action.params, action.page).pipe(
        map(({ notePads, total}) => {
          return new NotePadListLoadSuccess(notePads, total);
        }),
        catchError((errors) => {
          return of(new NotePadListLoadError(errors));
        })
      );
    }),
    tap((action) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  detailsLoadStart: Observable<Action> = this.actions.pipe(
    ofType(NOTEPAD_DETAILS_LOAD_START),
    mergeMap((action: NotePadDetailsLoadStart) => {
      const { id } = action;

      return this.service.get(id).pipe(
        map((notePad: NotePad) => {
          return new NotePadDetailsLoadSuccess(notePad);
        }),
        catchError((errors) => {
          return of(new NotePadDetailsLoadError(errors.error.errors));
        })
      );
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: NotePadService
  ) {}
}
