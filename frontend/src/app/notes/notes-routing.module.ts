import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteListPageComponent} from './note-list-page/note-list-page.component';

const routes: Routes = [
  { path: '', children: [
      { path: 'list', component: NoteListPageComponent  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {}
