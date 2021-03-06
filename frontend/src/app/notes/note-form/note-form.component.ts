import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../data/model/note.model";
import {NgForm} from "@angular/forms";
import {NotePadService} from "../services/note-pad.service";
import {NotePad} from "../data/model/note-pad.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  @Input() note: Note;
  @Input() errors;

  notePads: Observable<Array<NotePad>>;

  @Output('onSubmit') submitEvent: EventEmitter<Note> = new EventEmitter();

  constructor(
    private notePadService: NotePadService
  ) { }

  ngOnInit() {
    this.notePads = this.notePadService.getAll();
  }

  onSubmitHandler(form: NgForm)
  {
    this.submitEvent.emit(this.note);
  }

  compareNotePads(a: NotePad, b: NotePad)
  {
    return a.id === b.id;
  }

}
