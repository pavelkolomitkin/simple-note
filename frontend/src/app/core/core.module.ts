import {isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './header/header.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    NotFoundPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: isDevMode()
      }
    )
  ],
  exports: [
    HeaderComponent,
    StoreDevtoolsModule,
  ]
})
export class CoreModule { }
