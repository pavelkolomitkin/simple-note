import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-notepad-form',
  templateUrl: './notepad-form.component.html',
  styleUrls: ['./notepad-form.component.css']
})
export class NotepadFormComponent implements OnInit {

  @Input() errors: Object = {};

  @Input() notePad: NotePad;

  @Output('onSubmit') onSubmitEvent: EventEmitter<NotePad> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onSubmit(form: NgForm)
  {
    this.onSubmitEvent.emit(this.notePad);
  }



}
