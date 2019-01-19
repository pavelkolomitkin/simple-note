import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from "../../../app.state";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Router} from "@angular/router";
import {
  NOTEPAD_CREATE_START, NOTEPAD_DELETE_START,
  NOTEPAD_LIST_LOAD_START,
  NOTEPAD_UPDATE_START,
  NotePadCreateError,
  NotePadCreateStart,
  NotePadCreateSuccess, NotePadDeleteError, NotePadDeleteSuccess,
  NotePadListLoadError,
  NotePadListLoadStart,
  NotePadListLoadSuccess,
  NotePadResetCreated, NotePadUpdateError,
  NotePadUpdateStart, NotePadUpdateSuccess
} from "../note-pad.actions";
import {NotePadService} from "../../services/note-pad.service";
import {NotePad} from "../model/note-pad.model";

@Injectable()
export default class NotePadEffects {

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

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: NotePadService
  ) {}
}
