import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormFieldErrorListComponent} from '../core/form-field-error-list/form-field-error-list.component';
import {CreateNotepadWindowComponent} from '../notes/create-notepad-window/create-notepad-window.component';
import {NotepadFormComponent} from '../notes/notepad-form/notepad-form.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import {EditNotepadWindowComponent} from '../notes/edit-notepad-window/edit-notepad-window.component';
import {RemoveNotepadComponent} from '../notes/remove-notepad/remove-notepad.component';
import {SecureImageDirective} from "../core/directive/secure-image.directive";

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    CreateNotepadWindowComponent,
    EditNotepadWindowComponent,
    NotepadFormComponent,
    RemoveNotepadComponent,
    SecureImageDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule
  ],
  exports: [
    FormsModule,
    FormFieldErrorListComponent,
    CreateNotepadWindowComponent,
    EditNotepadWindowComponent,
    NotepadFormComponent,
    RemoveNotepadComponent,
    InfiniteScrollModule,
    MomentModule,
    SecureImageDirective
  ]
})
export class SharedModule { }
