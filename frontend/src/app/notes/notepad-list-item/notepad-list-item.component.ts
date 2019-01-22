import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";

@Component({
  selector: 'app-notepad-list-item',
  templateUrl: './notepad-list-item.component.html',
  styleUrls: ['./notepad-list-item.component.css']
})
export class NotepadListItemComponent implements OnInit {

  @Input() notePad: NotePad;

  @Output('onSelect') selectEvent: EventEmitter<NotePad> = new EventEmitter();
  @Output('onEdit') editEvent: EventEmitter<NotePad> = new EventEmitter();
  @Output('onDelete') deleteEvent: EventEmitter<NotePad> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click') onItemClickHandler()
  {
    this.selectEvent.emit(this.notePad);
  }

  onEditClickHandler(event: MouseEvent)
  {
    this.editEvent.emit(this.notePad);
    event.stopPropagation();
  }

  onRemoveClickHandler(event: MouseEvent)
  {
    this.deleteEvent.emit(this.notePad);
    event.stopPropagation()
  }

}
