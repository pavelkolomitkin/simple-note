import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule} from '@angular/common/http';
import SecurityService from '../security/services/security.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BaseApiUrlInterceptor} from './services/interceptors/base-api-url.interceptor';
import {DefaultHttpHeadersInterceptor} from './services/interceptors/default-http-headers.interceptor';
import {AuthTokenInjectorInterceptor} from './services/interceptors/auth-token-injector.interceptor';
import {LocalStorageService} from './services/local-storage.service';
import {appInitializeHandler, AppInitializerService} from './services/app-initializer.service';
import { FormFieldErrorListComponent } from '../shared/form-field-error-list/form-field-error-list.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { reducer } from './data/reducer';
import { GlobalProgressComponent } from './global-progress/global-progress.component';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true }
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
    HeaderComponent,
    GlobalProgressComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({
      core: reducer
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    httpInterceptorProviders,
    LocalStorageService,
    SecurityService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [AppInitializerService],
      multi: true
    }
  ],
  exports: [
    HeaderComponent,
    GlobalProgressComponent,
    StoreModule,
    EffectsModule
  ]
})
export class CoreModule { }
