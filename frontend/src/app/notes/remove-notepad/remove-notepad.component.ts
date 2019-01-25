import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NotePad} from "../data/model/note-pad.model";
import {NotePadDeleteCancel, NotePadDeleteStart} from "../data/note-pad.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-remove-notepad',
  templateUrl: './remove-notepad.component.html',
  styleUrls: ['./remove-notepad.component.css']
})
export class RemoveNotepadComponent implements OnInit, OnDestroy {

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  notePad: NotePad;

  deletingSubscription: Subscription;
  deletedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {

    this.deletingSubscription = this.store.pipe(select(state => state.notePad.deletingNotePad)).subscribe(
      (notePad: NotePad) => {
        if (notePad !== null)
        {
          this.notePad = notePad;

          // show modal window
          this.modalWindow = this.modalService.open(this.modalWindowTemplate);
          this.modalWindow.result.then(
            () => {
              this.modalWindow = null;
            },
            () => {
              this.modalWindow = null;
              this.store.dispatch(new NotePadDeleteCancel());
            }
          );
        }
        else
        {
          if (this.modalWindow !== null)
          {
            this.modalWindow.close();
            this.modalWindow = null;
          }

          this.notePad = null;
        }
      }
    );

    this.deletedSubscription = this.store.pipe(select(state => state.notePad.deletedNotePad)).subscribe(
      (notePad: NotePad) => {
        if (notePad !== null)
        {
          if (this.modalWindow !== null)
          {
            this.modalWindow.close();
            this.modalWindow = null;
          }

          this.notePad = null;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.deletingSubscription.unsubscribe();
    this.deletedSubscription.unsubscribe();
  }

  onCancelClickHandler(event: MouseEvent)
  {
    this.store.dispatch(new NotePadDeleteCancel());
  }

  onRemoveClickHandler(event: MouseEvent)
  {
    this.store.dispatch(new NotePadDeleteStart(this.notePad));
  }
}
