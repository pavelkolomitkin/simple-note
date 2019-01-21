import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteListPageComponent} from './note-list-page/note-list-page.component';
import {CreateNotePageComponent} from "./create-note-page/create-note-page.component";
import {NotepadListPageComponent} from "./notepad-list-page/notepad-list-page.component";
import {NoteDetailsPageComponent} from "./note-details-page/note-details-page.component";
import {EditNotePageComponent} from "./edit-note-page/edit-note-page.component";

const routes: Routes = [
  { path: '', children: [
      { path: 'list', component: NoteListPageComponent  },
      { path: 'add', component: CreateNotePageComponent  },
      { path: ':id', component: NoteDetailsPageComponent },
      { path: ':id/edit', component: EditNotePageComponent },
      { path: 'note-pad/list', component: NotepadListPageComponent  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {}
