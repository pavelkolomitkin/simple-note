import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Observable, Subscription} from "rxjs";
import {Note} from "../data/model/note.model";
import {NoteDetailsLoadStart} from "../data/note.actions";

@Component({
  selector: 'app-note-details-page',
  templateUrl: './note-details-page.component.html',
  styleUrls: ['./note-details-page.component.css']
})
export class NoteDetailsPageComponent implements OnInit, OnDestroy {

  private note: Observable<Note>;

  private noteSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.noteSubscription = this.route.params.subscribe(
      (params) => {

        this.store.dispatch(new NoteDetailsLoadStart(+params['id']));

        this.note = this.store.pipe(select(state => state.note.noteDetails));
      }
    )
  }

  ngOnDestroy(): void {

    this.noteSubscription.unsubscribe();

  }

}
