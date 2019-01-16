import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FormFieldErrorListComponent} from "../core/form-field-error-list/form-field-error-list.component";
import {CreateNotepadWindowComponent} from "../notes/create-notepad-window/create-notepad-window.component";
import {NotepadFormComponent} from "../notes/notepad-form/notepad-form.component";

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    CreateNotepadWindowComponent,
    NotepadFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    FormFieldErrorListComponent,
    CreateNotepadWindowComponent,
    NotepadFormComponent
  ]
})
export class SharedModule { }
