import {NoteAttachment} from "./note-attachment.model";

export class UploadNoteAttachment {

  public uploaded: NoteAttachment = null;

  public uploadedBytes: number;
  public totalSizeBytes: number;

  public errors: Object = null;

  public percentageProgress: number = 0;

  constructor(public id: string, public file: File) {}

  public setProgress(uploadedBytes: number, totalSizeBytes: number): UploadNoteAttachment
  {
    this.uploadedBytes = uploadedBytes;
    this.totalSizeBytes = totalSizeBytes;

    this.percentageProgress = Math.round(100 * this.uploadedBytes / this.totalSizeBytes);

    return this;
  }
}
