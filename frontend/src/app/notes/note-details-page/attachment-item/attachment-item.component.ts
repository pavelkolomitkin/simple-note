import {Component, Input, OnInit} from '@angular/core';
import {NoteAttachment} from "../../data/model/note-attachment.model";

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.css']
})
export class AttachmentItemComponent implements OnInit {

  @Input() attachment: NoteAttachment;

  constructor() { }

  ngOnInit() {
  }

}
