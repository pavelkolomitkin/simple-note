import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {UploadNoteAttachment} from '../data/model/upload-note-attachment.model';
import {Observable} from 'rxjs';
import {NoteAttachment} from '../data/model/note-attachment.model';

@Injectable()
export class NoteAttachmentService {
  constructor(private http: HttpClient) {}

  public upload(attachment: UploadNoteAttachment)
  {
    return new Observable((observer) => {

      const formData: FormData = new FormData();
      formData.append('imageFile', attachment.file);

      const request = new HttpRequest(
        'POST', '/note-attachment/create',
        formData,
        {
            reportProgress: true,
            headers: new HttpHeaders({ 'enctype':  'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'})
          }
        );

      this.http.request(request).subscribe(
        (event) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress)
          {
            //debugger;
            // this.percentDone = Math.round(100 * event.loaded / event.total);
            attachment.setProgress(event.loaded, event.total);
            observer.next(attachment);
          }
          else if (event instanceof HttpResponse)
          {
            //debugger;
            // success
            attachment.uploaded = event.body['attachment'];
            observer.next(attachment);
            console.log('------------------------------------- UPLOADING SUCCESS ---------------------------');
            console.log(event);
            console.log('-----------------------------------// UPLOADING SUCCESS ---------------------------');
          }
        },
        (errors) => {
          //debugger;
          console.log('------------------------------------- UPLOADING ERRORS ---------------------------');
          console.log(errors);
          console.log('-----------------------------------// UPLOADING ERRORS ---------------------------');
          attachment.errors = errors.error.errors;
          observer.error(attachment);
        },
        () => {
          //debugger;
          console.log('--------------------------- Uploading is complete --------------------------------');
        }
      );

    });
  }
}
