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
          if (event.type === HttpEventType.UploadProgress)
          {
            attachment.setProgress(event.loaded, event.total);
            observer.next(attachment);
          }
          else if (event instanceof HttpResponse)
          {
            // success
            attachment.uploaded = event.body['attachment'];
            observer.next(attachment);
          }
        },
        (errors) => {
          attachment.errors = errors.error.errors;
          observer.error(attachment);
        },
        () => {
        }
      );

    });
  }
}
