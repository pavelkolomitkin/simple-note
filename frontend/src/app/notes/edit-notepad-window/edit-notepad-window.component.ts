import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Subscription} from "rxjs";
import {NotePadEditingDispose, NotePadUpdateStart} from "../data/note-pad-actions";

@Component({
  selector: 'app-edit-notepad-window',
  templateUrl: './edit-notepad-window.component.html',
  styleUrls: ['./edit-notepad-window.component.css']
})
export class EditNotepadWindowComponent implements OnInit, OnDestroy {

  notePad: NotePad;

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  errors: Object = {};

  notePadUpdateSuccessSubscription: Subscription;
  notePadUpdateErrorSubscription: Subscription;
  notePadInitEditingSubscription: Subscription;

  constructor(
          private store: Store<State>,
          private modalService: NgbModal
  ) {
    this.notePadUpdateSuccessSubscription = this.store.pipe(select(state => state.notePad.updatedNotePad)).subscribe(
      (notePad: NotePad) => {
        if (notePad !== null)
        {
          this.store.dispatch(new NotePadEditingDispose());
        }
      }
    );

    this.notePadUpdateErrorSubscription = this.store.pipe(select(state => state.notePad.updateNotePadErrors)).subscribe(
      (errors) => {
        this.errors = errors;
      }
    );

    this.notePadInitEditingSubscription = this.store.pipe(select(state => state.notePad.editingNotePad)).subscribe(
      (notePad: NotePad) => {

        if (notePad !== null)
        {
          this.notePad = {...notePad};

          this.modalWindow = this.modalService.open(this.modalWindowTemplate);
          this.modalWindow.result.then(
            () => {
              this.modalWindow = null;
            },
            () => {
              this.modalWindow = null;
              this.store.dispatch(new NotePadEditingDispose());
            }
          )

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
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {

    this.notePadUpdateSuccessSubscription.unsubscribe();
    this.notePadUpdateErrorSubscription.unsubscribe();
    this.notePadInitEditingSubscription.unsubscribe();
  }

  onFormSubmitHandler(notePad: NotePad)
  {
    this.store.dispatch(new NotePadUpdateStart(notePad))
  }

}
