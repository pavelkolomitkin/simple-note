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
    
  }
}
