import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteListPageComponent} from './note-list-page/note-list-page.component';
import {CreateNotePageComponent} from "./create-note-page/create-note-page.component";
import {NotepadListPageComponent} from "./notepad-list-page/notepad-list-page.component";

const routes: Routes = [
  { path: '', children: [
      { path: 'list', component: NoteListPageComponent  },
      { path: 'add', component: CreateNotePageComponent  },
      { path: 'note-pad/list', component: NotepadListPageComponent  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {}
