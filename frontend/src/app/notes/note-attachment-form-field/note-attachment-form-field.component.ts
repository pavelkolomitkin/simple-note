import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {UploadNoteAttachment} from "../data/model/upload-note-attachment.model";
import {NoteAttachmentUploadReset, NoteAttachmentUploadSelect} from "../data/note-attachment.actions";
import {Observable, Subscription} from "rxjs";
import {Note} from "../data/model/note.model";
import {filter} from "rxjs/operators";
import {NoteAttachment} from "../data/model/note-attachment.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {GlobalNotifyErrorMessage} from "../../core/data/actions";
import {NotifyMessage} from "../../core/data/model/notify-message.model";

@Component({
  selector: 'app-note-attachment-form-field',
  templateUrl: './note-attachment-form-field.component.html',
  styleUrls: ['./note-attachment-form-field.component.css']
})
export class NoteAttachmentFormFieldComponent implements OnInit, OnDestroy {

  static MAX_UPLOAD_FILE_SIZE = 5242880;

  @ViewChild('removeAlertModal') removeAttachmentModalWindowTemplate: TemplateRef<any>;
  removeAttachmentModalWindow: NgbModalRef = null;

  @Input() note: Note;
  @Input() errors;

  completeSubscription: Subscription;

  uploadingAttachments: Observable<Array<UploadNoteAttachment>>;

  constructor(
    private store: Store<State>,
    private modal: NgbModal
  )
  {

  }

  ngOnInit() {
    this.store.dispatch(new NoteAttachmentUploadReset());

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

  validateFile(file: File)
  {
    //file.size
    if (file.type !== 'image')
    {
      throw 'You can upload only images';
    }
    if (file.size > NoteAttachmentFormFieldComponent.MAX_UPLOAD_FILE_SIZE)
    {
      throw 'File is too large! 5M is maximum';
    }
  }

  onFilesSelectHandler(files: Array<File>)
  {
    for (let file of files)
    {
      try {
        this.validateFile(file);

        const attachment = new UploadNoteAttachment(
          (+new Date()).toString() + file.name, file
        );

        this.store.dispatch(new NoteAttachmentUploadSelect(attachment));
      }
      catch (e) {
        this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(e)))
      }
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
