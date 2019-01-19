import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotePadDeleteInit, NotePadEditingInit, NotePadListLoadStart, NotePadListReset} from "../data/note-pad.actions";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notepad-list-page',
  templateUrl: './notepad-list-page.component.html',
  styleUrls: ['./notepad-list-page.component.css']
})
export class NotepadListPageComponent implements OnInit, OnDestroy {

  notePadList: Array<NotePad>;
  currentPageNumber: number;

  listLoadSuccessSubscription: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.notePadList = [];
    this.currentPageNumber = 1;

    this.store.dispatch(new NotePadListReset());
    this.store.dispatch(new NotePadListLoadStart());

    this.store.pipe(select(state => state.notePad.createdNotePad)).subscribe(this.onListChange);
    this.store.pipe(select(state => state.notePad.deletedNotePad)).subscribe(this.onListChange);
    this.store.pipe(select(state => state.notePad.updatedNotePad)).subscribe(this.onListChange);

    this.listLoadSuccessSubscription = this.store.pipe(select(state => state.notePad.list)).subscribe(
      (list: Array<NotePad>) => {
        if (this.currentPageNumber === 1)
        {
          this.notePadList = [];
        }
        this.notePadList = this.notePadList.concat(list);
      }
    );
  }

  onListChange = (notePad: NotePad) =>
  {
    //debugger;
    if (notePad !== null)
    {
      this.currentPageNumber = 1;
      this.store.dispatch(new NotePadListLoadStart());
    }
  }


  ngOnDestroy(): void {
    this.listLoadSuccessSubscription.unsubscribe();
  }

  onScroll()
  {
    this.currentPageNumber++;
    this.store.dispatch(new NotePadListLoadStart(this.currentPageNumber));
  }

  onSelectHandler(notePad: NotePad)
  {
    console.log('NotePad selected ->');
    console.log(notePad);
  }

  onEditHandler(notePad: NotePad)
  {
    this.store.dispatch(new NotePadEditingInit(notePad));
  }

  onDeleteHandler(notePad: NotePad)
  {
    this.store.dispatch(new NotePadDeleteInit(notePad));
  }
}
