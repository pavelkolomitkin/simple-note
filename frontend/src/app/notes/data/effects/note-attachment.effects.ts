import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from '../../../app.state';
import {GlobalProgressHide, GlobalProgressShow} from '../../../core/data/actions';
import {Router} from '@angular/router';

import { NoteAttachmentService } from "../../services/note-attachment.service";
import {
  NOTE_ATTACHMENT_UPLOAD_SELECT, NoteAttachmentUploadComplete,
  NoteAttachmentUploadError, NoteAttachmentUploadProgress,
  NoteAttachmentUploadSelect
} from "../note-attachment.actions";
import {UploadNoteAttachment} from "../model/upload-note-attachment.model";

@Injectable()
export class NoteAttachmentEffects
{
  @Effect()
  attachmentSelected: Observable<Action> = this.actions.pipe(
    ofType(NOTE_ATTACHMENT_UPLOAD_SELECT),
    mergeMap((action: NoteAttachmentUploadSelect) => {

      return this.service.upload(action.attachment).pipe(
        map((attachment) => {
          //debugger
          if (attachment instanceof UploadNoteAttachment)
          {
            return new NoteAttachmentUploadProgress(attachment);
          }
          else
          {
            return new NoteAttachmentUploadComplete(attachment);
          }
        }),
        catchError((attachment) => {
          return of(new NoteAttachmentUploadError(attachment));
        })
      );
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: NoteAttachmentService
  ) {}
}
