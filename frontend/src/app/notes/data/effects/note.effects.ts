import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Router} from '@angular/router';
import {NoteService} from '../../services/note.service';
import {Observable, of} from 'rxjs';
import {
  NOTE_CREATE_START,
  NOTE_DELETE_START, NOTE_DETAILS_LOAD_ERROR, NOTE_DETAILS_LOAD_START,
  NOTE_UPDATE_START,
  NoteCreateError,
  NoteCreateStart,
  NoteCreateSuccess,
  NoteDeleteError,
  NoteDeleteStart,
  NoteDeleteSuccess, NoteDetailsLoadError, NoteDetailsLoadStart, NoteDetailsLoadSuccess,
  NoteUpdateError,
  NoteUpdateStart,
  NoteUpdateSuccess
} from '../note.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {GlobalProgressHide, GlobalProgressShow} from '../../../core/data/actions';
import {Note} from '../model/note.model';

@Injectable()
export class NoteEffects {

  @Effect()
  noteCreationStart: Observable<Action> = this.actions.pipe(
    ofType(NOTE_CREATE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NoteCreateStart) => {

      const { note } = action;

      return this.service.create(note).pipe(
        map((newNote: Note) => {
          return new NoteCreateSuccess(newNote);
        }),
        catchError((errors) => {
          return of(new NoteCreateError(errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
      if (result instanceof NoteCreateSuccess)
      {
        this.router.navigateByUrl('/note/' + result.note.id);
      }
    })
  );

  @Effect()
  noteUpdatingStart: Observable<Action> = this.actions.pipe(
    ofType(NOTE_UPDATE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NoteUpdateStart) => {

      const { note } = action;

      return this.service.update(note).pipe(
        map((updatedNote: Note) => {
          return new NoteUpdateSuccess(updatedNote);
        }),
        catchError((errors) => {
          return of(new NoteUpdateError(errors.error.errors));
        })
      );
    })
    ,
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  noteDeletingStart: Observable<Action> = this.actions.pipe(
    ofType(NOTE_DELETE_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NoteDeleteStart) => {

      const { note } = action;

      return this.service.remove(note).pipe(
        map(() => {
          return new NoteDeleteSuccess(note);
        }),
        catchError((errors) => {
          return of(new NoteDeleteError(note, errors.error.errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  noteDetailsLoadStart: Observable<Action> = this.actions.pipe(
    ofType(NOTE_DETAILS_LOAD_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: NoteDetailsLoadStart) => {

      const { id } = action;

      return this.service.get(id).pipe(
        map((note: Note) => {
          return new NoteDetailsLoadSuccess(note);
        }),
        catchError((errors) => {
          return of(new NoteDetailsLoadError(errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect({dispatch: false})
  noteDetailsLoadError: Observable<Action> = this.actions.pipe(
    ofType(NOTE_DETAILS_LOAD_ERROR),
    tap((action) => {
      this.router.navigateByUrl('/404');
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: NoteService
  ){}
}
