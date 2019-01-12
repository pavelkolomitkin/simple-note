import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
