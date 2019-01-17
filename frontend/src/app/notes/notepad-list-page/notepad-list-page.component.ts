import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotePadListLoadStart} from "../data/note-pad-actions";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notepad-list-page',
  templateUrl: './notepad-list-page.component.html',
  styleUrls: ['./notepad-list-page.component.css']
})
export class NotepadListPageComponent implements OnInit, OnDestroy {

  notePadList: Array<NotePad> = [];
  currentPageNumber: number = 1;

  listLoadSuccessSubscription: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.listLoadSuccessSubscription = this.store.pipe(select(state => state.notePad.list)).subscribe(
     (list: Array<NotePad>) => {
        this.notePadList = this.notePadList.concat(list);
      }
    );

    this.store.dispatch(new NotePadListLoadStart());
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

  }

  onDeleteHandler(notePad: NotePad)
  {

  }
}
