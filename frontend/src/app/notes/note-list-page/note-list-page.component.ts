import {Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../data/model/note.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NoteListLoadStart, NoteListReset} from "../data/note.actions";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NotePadDetailsLoadStart, NotePadDetailsReset} from "../data/note-pad.actions";
import {NotePad} from "../data/model/note-pad.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-note-list-page',
  templateUrl: './note-list-page.component.html',
  styleUrls: ['./note-list-page.component.css']
})
export class NoteListPageComponent implements OnInit, OnDestroy {

  pageTitle: string;
  selectedNotePadId: number = NaN;
  selectedNotePad: NotePad = null;

  noteList: Array<Note> = [];
  isListEmpty: boolean;
  currentPageNumber: number;

  loadListSubscription: Subscription;
  routeSubscription: Subscription;
  notePadSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isListEmpty = false;
  }

  ngOnInit() {

    this.loadListSubscription = this.store.pipe(
      select(state => state.note),
      select((noteState) => {
        return {list: noteState.noteList, total: noteState.noteListTotal}
      })
    ).subscribe(
      ({ list, total }) => {
        if (this.currentPageNumber === 1)
        {
          this.noteList = [];
        }

        this.noteList = this.noteList.concat(list);
        this.isListEmpty = (total === 0);
    });

    this.store.dispatch(new NotePadDetailsReset());
    this.notePadSubscription = this.store.pipe(
      select(state => state.notePad.notePadDetails),
      filter(result => result !== null)
    ).subscribe(
      (notePad: NotePad) => {
        this.selectedNotePad = notePad;
        this.pageTitle = 'Notes from "' + this.selectedNotePad.title + '"';
      }
    );

    this.routeSubscription = this.route.queryParams.subscribe(
      (params) => {

        this.store.dispatch(new NotePadDetailsReset());
        this.store.dispatch(new NoteListReset());

        this.noteList = [];
        this.currentPageNumber = 1;
        this.selectedNotePadId = +params['notePad'];

        if (!isNaN(this.selectedNotePadId))
        {
          this.store.dispatch(new NotePadDetailsLoadStart(this.selectedNotePadId));
        }
        else
        {
          this.pageTitle = 'All Notes';
        }

        this.loadList();
      }
    )
  }

  ngOnDestroy(): void {

    this.loadListSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.notePadSubscription.unsubscribe();

    this.pageTitle = '';

  }

  loadList = () =>
  {
    const listParam = {};
    if (!isNaN(this.selectedNotePadId))
    {
      listParam['notePad'] = this.selectedNotePadId;
    }

    this.store.dispatch(new NoteListLoadStart(this.currentPageNumber, listParam));
  }

  onScroll()
  {
    this.currentPageNumber++;
    this.loadList();
  }

  onSelectNoteHandler(note: Note)
  {
    this.router.navigateByUrl('/note/' + note.id);
  }

}
