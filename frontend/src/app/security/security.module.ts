import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import {SecurityRoutingModule} from "./security-routing.module";
import {StoreModule} from "@ngrx/store";
import { reducer } from './data/reducer';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmationPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,
    StoreModule.forFeature('security', {security: reducer})
  ],
  exports: [ StoreModule ]
})
export class SecurityModule { }
