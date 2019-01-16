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

  @Output('onSubmit') onSubmitEvent: EventEmitter<NotePad> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onSubmit(form: NgForm)
  {
    const notePad: NotePad = {
      title: form.value.title
    };

    this.onSubmitEvent.emit(notePad);
  }



}
