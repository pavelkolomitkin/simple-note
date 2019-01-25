import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteAttachment} from "../../data/model/note-attachment.model";

@Component({
  selector: 'app-completed-attachment',
  templateUrl: './completed-attachment.component.html',
  styleUrls: ['./completed-attachment.component.css']
})
export class CompletedAttachmentComponent implements OnInit {

  @Input() attachment: NoteAttachment;

  @Output('onRemove') removeEvent: EventEmitter<NoteAttachment> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRemoveClickHandler()
  {
    this.removeEvent.emit(this.attachment);
  }

}
