import { Action } from '@ngrx/store';
import { NoteAttachment } from './model/note-attachment.model';
import {UploadNoteAttachment} from "./model/upload-note-attachment.model";

export const NOTE_ATTACHMENT_UPLOAD_RESET = 'NOTE_ATTACHMENT_UPLOAD_RESET';
export const NOTE_ATTACHMENT_UPLOAD_SELECT = 'NOTE_ATTACHMENT_UPLOAD_SELECT';
export const NOTE_ATTACHMENT_UPLOAD_PROGRESS = 'NOTE_ATTACHMENT_UPLOAD_PROGRESS';
export const NOTE_ATTACHMENT_UPLOAD_COMPLETE = 'NOTE_ATTACHMENT_UPLOAD_COMPLETE';
export const NOTE_ATTACHMENT_UPLOAD_ERROR = 'NOTE_ATTACHMENT_UPLOAD_ERROR';

export class NoteAttachmentUploadReset implements Action
{
  readonly type = NOTE_ATTACHMENT_UPLOAD_RESET;
}

export class NoteAttachmentUploadSelect implements Action
{
  readonly type = NOTE_ATTACHMENT_UPLOAD_SELECT;

  constructor(public attachment: UploadNoteAttachment) {}
}

export class NoteAttachmentUploadProgress implements Action
{
  readonly type = NOTE_ATTACHMENT_UPLOAD_PROGRESS;

  constructor(public attachment: UploadNoteAttachment) {}
}

export class NoteAttachmentUploadComplete implements Action
{
  readonly type = NOTE_ATTACHMENT_UPLOAD_COMPLETE;

  constructor(public attachment: NoteAttachment) {}
}

export class NoteAttachmentUploadError implements Action
{
  readonly type = NOTE_ATTACHMENT_UPLOAD_ERROR;

  constructor(public attachment: UploadNoteAttachment) {}
}

export type NoteAttachmentActions =
                          NoteAttachmentUploadReset
                        | NoteAttachmentUploadSelect
                        | NoteAttachmentUploadProgress
                        | NoteAttachmentUploadComplete
                        | NoteAttachmentUploadError

  ;

