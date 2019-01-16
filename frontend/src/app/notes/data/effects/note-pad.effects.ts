import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from "../../../app.state";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Router} from "@angular/router";
import {
  NOTEPAD_CREATE_START,
  NOTEPAD_CREATION_INIT,
  NotePadCreateError,
  NotePadCreateStart,
  NotePadCreateSuccess, NotePadResetCreated
} from "../note-pad-actions";
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


  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: NotePadService
  ) {}
}
