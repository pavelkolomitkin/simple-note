
export class UploadNoteAttachment {

  public uploadedBytes: number;
  public totalSizeBytes: number;

  public errors: Object;

  constructor(public id: string, public file: File) {}

  public setProgress(uploadedBytes: number, totalSizeBytes: number): UploadNoteAttachment
  {
    this.uploadedBytes = uploadedBytes;
    this.totalSizeBytes = totalSizeBytes;

    return this;
  }

  public get percentageProgress(): number
  {
    return Math.round(100 * this.uploadedBytes / this.totalSizeBytes);
  }
}
