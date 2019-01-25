import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../data/model/note.model";

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {

  @Input() note: Note;
  @Output('onSelect') selectEvent: EventEmitter<Note> = new EventEmitter();

  @HostListener('click') onClick()
  {
    this.selectEvent.emit(this.note);
  }

  constructor() { }

  ngOnInit() {
  }

}
