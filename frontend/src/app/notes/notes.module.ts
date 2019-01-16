import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListPageComponent } from './note-list-page/note-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {NotesRoutingModule} from './notes-routing.module';
import { CreateNotePageComponent } from './create-note-page/create-note-page.component';
import { EditNotePageComponent } from './edit-note-page/edit-note-page.component';
import { NotepadListPageComponent } from './notepad-list-page/notepad-list-page.component';

@NgModule({
  declarations: [
    NoteListPageComponent,
    CreateNotePageComponent,
    EditNotePageComponent,
    NotepadListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
