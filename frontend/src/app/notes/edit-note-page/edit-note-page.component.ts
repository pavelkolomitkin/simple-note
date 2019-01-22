import {Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../data/model/note.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteDetailsLoadStart, NoteDetailsReset, NoteUpdateReset, NoteUpdateStart} from "../data/note.actions";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-note-page',
  templateUrl: './edit-note-page.component.html',
  styleUrls: ['./edit-note-page.component.css']
})
export class EditNotePageComponent implements OnInit, OnDestroy {

  private note: Note = null;
  private errors: Object = {};

  private idSubscription: Subscription;
  private detailsSubscription: Subscription;
  private noteUpdatedSubscription: Subscription;
  private noteErrorSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.store.dispatch(new NoteDetailsReset());
    this.store.dispatch(new NoteUpdateReset());

    this.idSubscription = this.route.params.subscribe(
      (params) => {
        this.store.dispatch(new NoteDetailsLoadStart(+params['id']));
      }
    );

    this.detailsSubscription = this.store.pipe(
      select(state => state.note.noteDetails),
      filter(result => result !== null)
    ).subscribe(
      (note: Note) => {
        this.note = note;
      }
    );

    this.noteUpdatedSubscription = this.store.pipe(
      select(state => state.note.updatedNote),
      filter(result => result !== null)).subscribe(
      (note: Note) => {
        this.router.navigateByUrl('/note/' + note.id);
      }
    );

    this.noteErrorSubscription = this.store.pipe(
      select(state => state.note.updateNoteErrors),
      filter(result => Object.keys(result).length > 0)
    ).subscribe(
      (errors) => {
        this.errors = errors;
      }
    );
  }

  ngOnDestroy(): void {

    this.idSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
    this.noteUpdatedSubscription.unsubscribe();
    this.noteErrorSubscription.unsubscribe();

  }

  onFormSubmitHandler()
  {
    this.store.dispatch(new NoteUpdateStart(this.note));
  }

}
