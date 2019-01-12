import {isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './header/header.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientModule} from "@angular/common/http";
import SecurityService from "../security/services/security.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BaseApiUrlInterceptor} from "./services/interceptors/base-api-url.interceptor";
import {DefaultHttpHeadersInterceptor} from "./services/interceptors/default-http-headers.interceptor";
import {AuthTokenInjectorInterceptor} from "./services/interceptors/auth-token-injector.interceptor";

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true }
];

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
  providers: [
    httpInterceptorProviders,
    SecurityService
  ],
  exports: [
    HeaderComponent,
    StoreDevtoolsModule,
  ]
})
export class CoreModule { }
