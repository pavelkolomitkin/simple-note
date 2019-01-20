import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {UploadNoteAttachment} from "../data/model/upload-note-attachment.model";
import {NoteAttachmentUploadSelect} from "../data/note-attachment.actions";
import {Observable, Subscription} from "rxjs";
import {Note} from "../data/model/note.model";
import {filter} from "rxjs/operators";
import {NoteAttachment} from "../data/model/note-attachment.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-note-attachment-form-field',
  templateUrl: './note-attachment-form-field.component.html',
  styleUrls: ['./note-attachment-form-field.component.css']
})
export class NoteAttachmentFormFieldComponent implements OnInit, OnDestroy {

  @ViewChild('removeAlertModal') removeAttachmentModalWindowTemplate: TemplateRef<any>;
  removeAttachmentModalWindow: NgbModalRef = null;

  @Input() note: Note;

  completeSubscription: Subscription;

  uploadingAttachments: Observable<Array<UploadNoteAttachment>>;

  constructor(
    private store: Store<State>,
    private modal: NgbModal
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

  onRemoveHandler(attachment: NoteAttachment)
  {
    this.removeAttachmentModalWindow = this.modal.open(this.removeAttachmentModalWindowTemplate);
    this.removeAttachmentModalWindow.result
      .then((result) => {
        const removingItemIndex = this.note.attachments.findIndex(item => attachment.id === item.id);
        if (removingItemIndex !== -1)
        {
          this.note.attachments.splice(removingItemIndex, 1);
        }

        this.removeAttachmentModalWindow = null;
      }, () => {
        this.removeAttachmentModalWindow = null;
      });
  }

}
