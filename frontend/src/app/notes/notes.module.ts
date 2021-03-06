import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListPageComponent } from './note-list-page/note-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {NotesRoutingModule} from './notes-routing.module';
import { CreateNotePageComponent } from './create-note-page/create-note-page.component';
import { EditNotePageComponent } from './edit-note-page/edit-note-page.component';
import { NotepadListPageComponent } from './notepad-list-page/notepad-list-page.component';
import { NotepadListItemComponent } from './notepad-list-item/notepad-list-item.component';
import { NoteFormComponent } from './note-form/note-form.component';
import {StoreModule} from "@ngrx/store";
import { reducer as noteAttachmentReducer } from "./data/note-attachment.reducer";
import { reducer as noteReducer } from './data/note.reducer';
import {EffectsModule} from "@ngrx/effects";
import {NoteAttachmentEffects} from "./data/effects/note-attachment.effects";
import { NoteAttachmentFormFieldComponent } from './note-attachment-form-field/note-attachment-form-field.component';
import { UploadingAttachmentComponent } from './note-attachment-form-field/uploading-attachment/uploading-attachment.component';
import { CompletedAttachmentComponent } from './note-attachment-form-field/completed-attachment/completed-attachment.component';
import {NoteEffects} from "./data/effects/note.effects";
import { NoteDetailsPageComponent } from './note-details-page/note-details-page.component';
import { AttachmentItemComponent } from './note-details-page/attachment-item/attachment-item.component';
import { NoteListItemComponent } from './note-list-page/note-list-item/note-list-item.component';
import { NoteAttachmentPreviewSmallComponent } from './note-list-page/note-attachment-preview-small/note-attachment-preview-small.component';

@NgModule({
  declarations: [
    NoteListPageComponent,
    CreateNotePageComponent,
    EditNotePageComponent,
    NotepadListPageComponent,
    NotepadListItemComponent,
    NoteFormComponent,
    NoteAttachmentFormFieldComponent,
    UploadingAttachmentComponent,
    CompletedAttachmentComponent,
    NoteDetailsPageComponent,
    AttachmentItemComponent,
    NoteListItemComponent,
    NoteAttachmentPreviewSmallComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule,
    StoreModule.forFeature('noteAttachment', noteAttachmentReducer),
    StoreModule.forFeature('note', noteReducer),
    EffectsModule.forFeature([ NoteAttachmentEffects, NoteEffects ])
  ],
  exports: [ StoreModule, EffectsModule ]
})
export class NotesModule { }
