import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'security', loadChildren: './security/security.module#SecurityModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
