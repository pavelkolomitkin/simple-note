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
import {EffectsModule} from "@ngrx/effects";
import {NoteAttachmentEffects} from "./data/effects/note-attachment.effects";
import { NoteAttachmentFormFieldComponent } from './note-attachment-form-field/note-attachment-form-field.component';
import { UploadingAttachmentComponent } from './note-attachment-form-field/uploading-attachment/uploading-attachment.component';
import { CompletedAttachmentComponent } from './note-attachment-form-field/completed-attachment/completed-attachment.component';

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
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule,
    StoreModule.forFeature('noteAttachment', noteAttachmentReducer),
    EffectsModule.forFeature([ NoteAttachmentEffects ])
  ],
  exports: [ StoreModule, EffectsModule ]
})
export class NotesModule { }
