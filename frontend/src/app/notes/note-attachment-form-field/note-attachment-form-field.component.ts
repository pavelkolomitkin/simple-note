import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {UploadNoteAttachment} from "../data/model/upload-note-attachment.model";
import {NoteAttachmentUploadSelect} from "../data/note-attachment.actions";
import {Observable, Subscription} from "rxjs";
import {Note} from "../data/model/note.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-note-attachment-form-field',
  templateUrl: './note-attachment-form-field.component.html',
  styleUrls: ['./note-attachment-form-field.component.css']
})
export class NoteAttachmentFormFieldComponent implements OnInit, OnDestroy {

  @Input() note: Note;

  completeSubscription: Subscription;

  uploadingAttachments: Observable<Array<UploadNoteAttachment>>;

  constructor(
    private store: Store<State>
  )
  {
    this.uploadingAttachments = this.store.pipe(select(state => state.noteAttachment.uploadingFileSet));

    this.completeSubscription = this.store.pipe(
      select(state => state.noteAttachment.lastCompletedUploadAttachment),
      filter(result => (result !== null))
      ).subscribe(
      (completed: UploadNoteAttachment) => {
          this.note.attachments.push(completed.uploaded);
      }
    );
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

  ngOnDestroy(): void {
    this.completeSubscription.unsubscribe();
  }

}
