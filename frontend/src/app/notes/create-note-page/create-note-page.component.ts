import { Component, OnInit } from '@angular/core';
import {Note} from "../data/model/note.model";
import {NotePad} from "../data/model/note-pad.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";
import {NoteCreateStart} from "../data/note.actions";
import {NoteAttachmentUploadReset} from "../data/note-attachment.actions";

@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.css']
})
export class CreateNotePageComponent implements OnInit {

  note: Note;

  errors: Observable<{}>;

  constructor(
    private store: Store<State>
  ) {

    this.note = new Note();

    this.errors = this.store.pipe(
      select(state => state.note.createNoteErrors),
      filter(errors => errors !== null))
    ;
  }

  ngOnInit() {
    //this.store.dispatch(new NoteAttachmentUploadReset());
  }

  onFormSubmit(note: Note)
  {
    this.store.dispatch(new NoteCreateStart(this.note));
  }

}
