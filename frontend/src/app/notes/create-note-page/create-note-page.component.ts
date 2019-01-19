import { Component, OnInit } from '@angular/core';
import {Note} from "../data/model/note.model";

@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.css']
})
export class CreateNotePageComponent implements OnInit {

  note: Note = {
    attachments: []
  } as Note;

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit()
  {

  }

}
