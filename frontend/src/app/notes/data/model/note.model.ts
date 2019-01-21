import {NotePad} from "./note-pad.model";
import {NoteAttachment} from "./note-attachment.model";

export class Note {
  id: number;
  content: string;
  notePad: NotePad;
  attachments: Array<NoteAttachment>;

  constructor() {
    this.notePad = new NotePad();
    this.attachments = [];
  }
}
