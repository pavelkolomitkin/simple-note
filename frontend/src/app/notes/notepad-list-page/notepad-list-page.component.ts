import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotePadDeleteInit, NotePadEditingInit, NotePadListLoadStart, NotePadListReset} from "../data/note-pad.actions";
import {merge, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notepad-list-page',
  templateUrl: './notepad-list-page.component.html',
  styleUrls: ['./notepad-list-page.component.css']
})
export class NotepadListPageComponent implements OnInit, OnDestroy {

  notePadList: Array<NotePad>;
  currentPageNumber: number;

  isListEmpty: Boolean = false;

  listLoadSuccessSubscription: Subscription;
  itemChangeSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {

    this.notePadList = [];
    this.currentPageNumber = 1;

    this.store.dispatch(new NotePadListReset());
    this.store.dispatch(new NotePadListLoadStart());


    this.itemChangeSubscription = merge(
      this.store.pipe(select(state => state.notePad.createdNotePad)),
      this.store.pipe(select(state => state.notePad.deletedNotePad)),
      this.store.pipe(select(state => state.notePad.updatedNotePad)),
    ).subscribe(this.onListChange);

    this.listLoadSuccessSubscription = this.store.pipe(
      select(state => state.notePad),
      select((result) => {
        return {
          list: result.list,
          total: result.totalNumber
        };
      })
    ).subscribe(
      ({list, total}) => {
        if (this.currentPageNumber === 1)
        {
          this.notePadList = [];
        }
        this.notePadList = this.notePadList.concat(list);
        this.isListEmpty = (total === 0);
      }
    );
  }

  onListChange = (notePad: NotePad) =>
  {
    if (notePad !== null)
    {
      this.currentPageNumber = 1;
      this.store.dispatch(new NotePadListLoadStart());
    }
  }


  ngOnDestroy(): void {
    this.listLoadSuccessSubscription.unsubscribe();
    this.itemChangeSubscription.unsubscribe();
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

    this.router.navigateByUrl('/note/list?notePad=' + notePad.id);
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
