import * as actions from './note-attachment.actions';
import {UploadNoteAttachment} from './model/upload-note-attachment.model';


export interface State {
  uploadingFileSet: Array<UploadNoteAttachment>;
  lastSelectedUploadingAttachment: UploadNoteAttachment;
  lastCompletedUploadAttachment: UploadNoteAttachment;
  lastProgressedUploadAttachment: UploadNoteAttachment;
  lastErrorUploadingAttachment: UploadNoteAttachment;
}

const initialState: State = {
  uploadingFileSet: [],
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
        uploadingFileSet: [],
        lastSelectedUploadingAttachment: null,
        lastCompletedUploadAttachment: null,
        lastProgressedUploadAttachment: null
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_SELECT:

      state.uploadingFileSet.push(action.attachment);

      return {
        ...state,
        uploadingFileSet: [...state.uploadingFileSet ],
        lastSelectedUploadingAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_PROGRESS:
      
      return {
        ...state,
        lastProgressedUploadAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_COMPLETE:

      const completedItemIndex = state.uploadingFileSet.findIndex((item: UploadNoteAttachment) => {
        return (item.id === action.attachment.id);
      });

      let restUploadingSet = state.uploadingFileSet;
      if (completedItemIndex !== -1)
      {
        restUploadingSet.splice(completedItemIndex, 1);
      }

      return {
        ...state,
        uploadingFileSet: [...restUploadingSet],
        lastCompletedUploadAttachment: action.attachment
      };

    case actions.NOTE_ATTACHMENT_UPLOAD_ERROR:

      return {
        ...state,
        lastErrorUploadingAttachment: action.attachment
      };

    default:

      return state;
  }
}
