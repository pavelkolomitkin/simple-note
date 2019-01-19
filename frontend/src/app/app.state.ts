import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as notePadReducer from './notes/data/note-pad.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  notePad: notePadReducer.State
}
