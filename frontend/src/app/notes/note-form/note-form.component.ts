import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../data/model/note.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  @Input() note: Note;

  @Output('onSubmit') submitEvent: EventEmitter<Note> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }


  onSubmitHandler(form: NgForm)
  {

  }

}
