import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Observable, Subscription} from "rxjs";
import {Note} from "../data/model/note.model";
import {NoteDeleteInit, NoteDetailsLoadStart, NoteDetailsReset} from "../data/note.actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-note-details-page',
  templateUrl: './note-details-page.component.html',
  styleUrls: ['./note-details-page.component.css']
})
export class NoteDetailsPageComponent implements OnInit, OnDestroy {

  private note: Note = null;

  private noteSubscription: Subscription;
  private idSubscription: Subscription;
  private deleteNoteSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.store.dispatch(new NoteDetailsReset());

    this.idSubscription = this.route.params.subscribe(
      (params) => {
        this.store.dispatch(new NoteDetailsLoadStart(+params['id']));
      }
    );

    this.noteSubscription = this.store.pipe(
      select(state => state.note.noteDetails),
      filter(result => result !== null)
    ).subscribe(
      (note: Note) => {
        this.note = note;
      }
    );

    this.deleteNoteSubscription = this.store.pipe(
      select(state => state.note.lastDeletedNote),
      filter(result => !!result)).subscribe(
      (deletedNote: Note) => {
        if (this.note !== null && (deletedNote.id === this.note.id))
        {
          this.router.navigateByUrl('/note/list');
        }
      }
    )
  }

  ngOnDestroy(): void {

    this.noteSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.deleteNoteSubscription.unsubscribe();
  }

  onRemoveClickHandler()
  {
    this.store.dispatch(new NoteDeleteInit(this.note));
  }
}
