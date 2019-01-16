import {NotePad} from "./note-pad.model";

export interface Note {
  id: number,
  content: string,
  notePad: NotePad,
  attachments: Array<{id: number}>
}
