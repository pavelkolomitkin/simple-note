import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  public getList(parameters: Object, page: number = 1)
  {
    let params = new HttpParams().set('page', page.toString());

    for (let [name, value] of Object.entries(parameters))
    {
      params = params.append(name, value.toString());
    }

    return this.http.get<{notePads:Array<{notePad: NotePad, noteNumber: number}>, total: number}>('/notepad/list', {
      params
    }).pipe(
      map(({notePads, total}) => {
        return {
          notePads: notePads.map(({notePad, noteNumber}) => {
            notePad.noteNumber = noteNumber;
            return notePad;
          }),
          total: total
        }
      })
    );
  }

  public getAll()
  {
    return this.http.get<{notePads:Array<{notePad: NotePad, noteNumber: number}>}>('/notepad/all').pipe(
      map(({notePads}) => {
        return notePads.map(
          ({notePad, noteNumber}) => {
            notePad.noteNumber = noteNumber;
            return notePad;
          });
      })
    );
  }
}
