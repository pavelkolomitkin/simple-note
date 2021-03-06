import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: !environment.production
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
