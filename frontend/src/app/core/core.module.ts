import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import SecurityService from '../security/services/security.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BaseApiUrlInterceptor} from './services/interceptors/base-api-url.interceptor';
import {DefaultHttpHeadersInterceptor} from './services/interceptors/default-http-headers.interceptor';
import {AuthTokenInjectorInterceptor} from './services/interceptors/auth-token-injector.interceptor';
import {LocalStorageService} from './services/local-storage.service';
import {appInitializeHandler, AppInitializerService} from './services/app-initializer.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { reducer as coreReducer } from './data/reducer';
import { reducer as securityReducer } from '../security/data/reducer';
import { reducer as notePadReducer } from '../notes/data/note-pad.reducer';
import { GlobalProgressComponent } from './global-progress/global-progress.component';
import RegisterEffects from '../security/data/effects/register.effects';
import AuthEffects from '../security/data/effects/auth.effects';
import {AuthUserGuard} from '../security/services/guards/AuthUserGuard';
import {RouterModule} from '@angular/router';
import NotePadEffects from '../notes/data/effects/note-pad.effects';
import {NotePadService} from '../notes/services/note-pad.service';
import { MomentModule } from 'ngx-moment';
import {NoteAttachmentService} from '../notes/services/note-attachment.service';
import {NoteService} from "../notes/services/note.service";
import { MessageNotifierComponent } from './message-notifier/message-notifier.component';
import { MessageComponent } from './message-notifier/message/message.component';


const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true }
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
    HeaderComponent,
    GlobalProgressComponent,
    MessageNotifierComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot({
      core: coreReducer,
      security: securityReducer,
      notePad: notePadReducer
    }),
    EffectsModule.forRoot([
      RegisterEffects, AuthEffects, NotePadEffects
    ])
  ],
  providers: [
    AuthUserGuard,
    httpInterceptorProviders,
    LocalStorageService,
    SecurityService,
    NoteService,
    NotePadService,
    NoteAttachmentService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [AppInitializerService],
      multi: true
    }
  ],
  exports: [
    MomentModule,
    HeaderComponent,
    MessageNotifierComponent,
    GlobalProgressComponent,
    StoreModule,
    EffectsModule
  ]
})
export class CoreModule { }
