import {NotePad} from "./note-pad.model";
import {NoteAttachment} from "./note-attachment.model";

export interface Note {
  id: number;
  content: string;
  notePad: NotePad;
  attachments: Array<NoteAttachment>;
}
