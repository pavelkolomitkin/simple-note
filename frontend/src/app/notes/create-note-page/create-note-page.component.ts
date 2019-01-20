import { Component, OnInit } from '@angular/core';
import {Note} from "../data/model/note.model";
import {NotePad} from "../data/model/note-pad.model";

@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.css']
})
export class CreateNotePageComponent implements OnInit {

  note: Note = {
    notePad: {} as NotePad,
    attachments: []
  } as Note;

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit()
  {

  }

}
