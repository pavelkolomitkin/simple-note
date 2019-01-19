import * as actions from './note-attachment.actions';
import {UploadNoteAttachment} from './model/upload-note-attachment.model';


export interface State {
  uploadingFileSet: {[s: string]: UploadNoteAttachment};
  lastSelectedUploadingAttachment: UploadNoteAttachment;
  lastCompletedUploadAttachment: UploadNoteAttachment;
  lastProgressedUploadAttachment: UploadNoteAttachment;
  lastErrorUploadingAttachment: UploadNoteAttachment;
}

const initialState: State = {
  uploadingFileSet: {},
  lastSelectedUploadingAttachment: null,
  lastCompletedUploadAttachment: null,
  lastProgressedUploadAttachment: null,
  lastErrorUploadingAttachment: null
};

export function reducer(state: State = initialState, action: actions.NoteAttachmentActions) {

  switch (action.type) {

    case actions.NOTE_ATTACHMENT_UPLOAD_RESET:

      return {
        ...state,
        uploadingFileSet: {},
        lastSelectedUploadingAttachment: null,
        lastCompletedUploadAttachment: null,
        lastProgressedUploadAttachment: null
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_SELECT:

      state.uploadingFileSet[action.attachment.id] = action.attachment;

      return {
        ...state,
        uploadingFileSet: { ...state.uploadingFileSet },
        lastSelectedUploadingAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_PROGRESS:
      
      return {
        ...state,
        lastProgressedUploadAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_COMPLETE:

      return {
        ...state,
        lastCompletedUploadAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_ERROR:

      return {
        ...state,

        
      };

    default:

      return state;
  }
}
