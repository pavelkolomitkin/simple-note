import { BrowserModule } from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: isDevMode()
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
