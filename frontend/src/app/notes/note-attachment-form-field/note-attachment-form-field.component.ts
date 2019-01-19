import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../data/note-attachment.reducer";
import {UploadNoteAttachment} from "../data/model/upload-note-attachment.model";
import {NoteAttachmentUploadSelect} from "../data/note-attachment.actions";

@Component({
  selector: 'app-note-attachment-form-field',
  templateUrl: './note-attachment-form-field.component.html',
  styleUrls: ['./note-attachment-form-field.component.css']
})
export class NoteAttachmentFormFieldComponent implements OnInit {

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
  }

  onFilesSelectHandler(files: Array<File>)
  {
    //debugger;
    console.log(files);

    for (let file of files)
    {
      const attachment = new UploadNoteAttachment(
        (+new Date()).toString() + file.name, file
      );

      this.store.dispatch(new NoteAttachmentUploadSelect(attachment));
    }
  }

}
