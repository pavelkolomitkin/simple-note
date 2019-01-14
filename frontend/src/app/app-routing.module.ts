import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/not-found-page/not-found-page.component';
import {AuthUserGuard} from "./security/services/guards/AuthUserGuard";

const routes: Routes = [
  { path: 'security', loadChildren: './security/security.module#SecurityModule' },
  { path: 'note', loadChildren: './notes/notes.module#NotesModule', canActivate: [AuthUserGuard], canActivateChild: [AuthUserGuard] },
  { path: '', redirectTo: '/note/list', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
