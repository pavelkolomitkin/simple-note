import {Component, Input, OnInit} from '@angular/core';
import {UploadNoteAttachment} from "../../data/model/upload-note-attachment.model";

@Component({
  selector: 'app-uploading-attachment',
  templateUrl: './uploading-attachment.component.html',
  styleUrls: ['./uploading-attachment.component.css']
})
export class UploadingAttachmentComponent implements OnInit {

  isVisible: boolean = false;
  imageUrl: string = null;

  @Input() attachment: UploadNoteAttachment;

  constructor() { }

  ngOnInit() {
    this.readPreviewUrl();
  }

  readPreviewUrl()
  {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.imageUrl = event.target['result'];
      this.isVisible = true;
    };

    reader.readAsDataURL(this.attachment.file);
  }

}
