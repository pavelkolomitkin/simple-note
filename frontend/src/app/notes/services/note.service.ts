import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Note} from "../data/model/note.model";
import {Observable} from "rxjs";

@Injectable()
export class NoteService
{
  constructor(private http: HttpClient) {}

  public get(id: number): Observable<Note>
  {
    return this.http.get<{ note: Note }>('/note/' + id).pipe(
      map(result => result.note)
    );
  }

  public create(note: Note)
  {
    return this.http.post<{ note: Note }>('/note', {
      content: note.content,
      notePad: note.notePad.id,
      attachments: note.attachments.map(item => item.id)
    }).pipe(
      map((result => result.note))
    );
  }

  public update(note: Note)
  {
    return this.http.put<{note: Note}>('/note/' + note.id, {
      content: note.content,
      notePad: note.notePad.id,
      attachments: note.attachments.map(item => item.id)
    }).pipe(
      map(result => result.note)
    );
  }

  public remove(note: Note)
  {
    return this.http.delete('/note/' + note.id);
  }
}
