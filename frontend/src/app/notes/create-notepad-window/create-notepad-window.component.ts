import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotePad} from "../data/model/note-pad.model";
import {Subscription} from "rxjs";
import {NotePadCreateStart, NotePadCreationDispose} from "../data/note-pad.actions";
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-notepad-window',
  templateUrl: './create-notepad-window.component.html',
  styleUrls: ['./create-notepad-window.component.css']
})
export class CreateNotepadWindowComponent implements OnInit, OnDestroy {

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  notePad: NotePad;

  errors: Object = {};

  notePadCreateSuccessSubscription: Subscription;
  notePadCreateErrorSubscription: Subscription;
  notePadInitCreationSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.notePad = new NotePad();

    this.notePadCreateSuccessSubscription = this.store.pipe(select(state => state.notePad.createdNotePad)).subscribe(
      (notePad: NotePad) => {

        if (notePad !== null)
        {
          this.store.dispatch(new NotePadCreationDispose());
        }
      }
    );

    this.notePadCreateErrorSubscription = this.store.pipe(select(state => state.notePad.createNotePadErrors)).subscribe(
      (errors: Object) => {
        this.errors = errors;
      }
    );

    this.notePadInitCreationSubscription = this.store.pipe(select(state => state.notePad.initCreation)).subscribe(
      (isWindowShown) => {
        if (isWindowShown)
        {
          this.notePad = {} as NotePad;

          this.modalWindow = this.modalService.open(this.modalWindowTemplate);
          this.modalWindow.result.then(
            () => {
              this.modalWindow = null;
            },
            () => {
              this.modalWindow = null;
              this.store.dispatch(new NotePadCreationDispose());
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
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.notePadCreateSuccessSubscription.unsubscribe();
    this.notePadCreateErrorSubscription.unsubscribe();
    this.notePadInitCreationSubscription.unsubscribe();
  }

  onFormSubmitHandler(notePad: NotePad)
  {
    this.store.dispatch(new NotePadCreateStart(notePad));
  }

}
