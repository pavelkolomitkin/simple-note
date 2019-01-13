import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'security', loadChildren: './security/security.module#SecurityModule' },
  { path: 'note', loadChildren: './notes/notes.module#NotesModule' },

  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
