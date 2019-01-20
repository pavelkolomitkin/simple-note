import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as notePadReducer from './notes/data/note-pad.reducer';
import * as noteAttachmentReducer from './notes/data/note-attachment.reducer';
import * as noteReducer from './notes/data/note.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  notePad: notePadReducer.State;
  noteAttachment: noteAttachmentReducer.State;
  note: noteReducer.State;
}
