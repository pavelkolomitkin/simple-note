import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FormFieldErrorListComponent} from "./form-field-error-list/form-field-error-list.component";

@NgModule({
  declarations: [
    FormFieldErrorListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    FormFieldErrorListComponent
  ]
})
export class SharedModule { }
