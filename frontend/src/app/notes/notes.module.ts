import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListPageComponent } from './note-list-page/note-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {NotesRoutingModule} from './notes-routing.module';

@NgModule({
  declarations: [
    NoteListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
