import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NotePad} from "../data/model/note-pad.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class NotePadService
{
  constructor(private http: HttpClient) {}

  public get(id: number): Observable<NotePad>
  {
    return this.http.get<{notePad: NotePad}>('/notepad/' + id).pipe(
      map(result => result.notePad)
    );
  }

  public create(notePad: NotePad): Observable<NotePad>
  {
    return this.http.post<{ notePad: NotePad }>('/notepad', {
      title: notePad.title
    }).pipe(
      map(result => result.notePad)
    );
  }

  public update(notePad: NotePad): Observable<NotePad>
  {
    return this.http.put<{ notePad: NotePad }>('/notepad/' + notePad.id, {
      title: notePad.title
    }).pipe(
      map(result => result.notePad)
    );
  }

  public remove(notePad: NotePad): Observable<boolean>
  {
    return this.http.delete('/notepad/' + notePad.id).pipe(
      map(result => true)
    );
  }
}
