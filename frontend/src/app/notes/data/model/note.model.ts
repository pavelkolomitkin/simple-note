import {NotePad} from "./note-pad.model";
import {NoteAttachment} from "./note-attachment.model";

export class Note {
  public id: number;
  public content: string;
  public notePad: NotePad;
  public attachments: Array<NoteAttachment>;
  public createdAt: number;

  constructor() {
    this.notePad = new NotePad();
    this.attachments = [];
  }
}
