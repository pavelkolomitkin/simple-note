import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {UploadNoteAttachment} from "../data/model/upload-note-attachment.model";
import {NoteAttachmentUploadSelect} from "../data/note-attachment.actions";
import {NoteAttachment} from "../data/model/note-attachment.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-note-attachment-form-field',
  templateUrl: './note-attachment-form-field.component.html',
  styleUrls: ['./note-attachment-form-field.component.css']
})
export class NoteAttachmentFormFieldComponent implements OnInit {

  uploadingAttachments: Observable<Array<UploadNoteAttachment>>;
  completedAttachments: Array<NoteAttachment> = [];

  constructor(
    private store: Store<State>
  )
  {
    this.uploadingAttachments = this.store.pipe(select(state => state.noteAttachment.uploadingFileSet));
  }

  ngOnInit() {
  }

  onFilesSelectHandler(files: Array<File>)
  {
    for (let file of files)
    {
      const attachment = new UploadNoteAttachment(
        (+new Date()).toString() + file.name, file
      );

      this.store.dispatch(new NoteAttachmentUploadSelect(attachment));
    }
  }

}
