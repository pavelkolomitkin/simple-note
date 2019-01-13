import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ConfirmationPageComponent} from './confirmation-page/confirmation-page.component';
import {RegisterSuccessfulPageComponent} from "./register-successful-page/register-successful-page.component";

const routes: Routes = [
  { path: '', children: [
      { path: 'register-success', component: RegisterSuccessfulPageComponent },
      { path: 'register-confirm/:key', component: ConfirmationPageComponent},
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule{}
