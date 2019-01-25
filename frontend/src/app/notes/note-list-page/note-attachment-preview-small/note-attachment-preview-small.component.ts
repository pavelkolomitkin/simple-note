import {Component, Input, OnInit} from '@angular/core';
import {NoteAttachment} from "../../data/model/note-attachment.model";

@Component({
  selector: 'app-note-attachment-preview-small',
  templateUrl: './note-attachment-preview-small.component.html',
  styleUrls: ['./note-attachment-preview-small.component.css']
})
export class NoteAttachmentPreviewSmallComponent implements OnInit {

  @Input() attachment: NoteAttachment;

  constructor() { }

  ngOnInit() {
  }

}
