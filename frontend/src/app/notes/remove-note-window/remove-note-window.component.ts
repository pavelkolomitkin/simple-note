import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Note} from "../data/model/note.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NoteDeleteCancel, NoteDeleteStart} from "../data/note.actions";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-remove-note-window',
  templateUrl: './remove-note-window.component.html',
  styleUrls: ['./remove-note-window.component.css']
})
export class RemoveNoteWindowComponent implements OnInit, OnDestroy {

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  note: Note;

  deletingSubscription: Subscription;
  deletedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.deletingSubscription = this.store.pipe(
      select(state => state.note),
      filter(result => !!result),
      select(note => note.noteDeleting)).subscribe(
      (note: Note) => {
        if (note !== null)
        {
          this.note = note;

          this.modalWindow = this.modalService.open(this.modalWindowTemplate);
          this.modalWindow.result.then(
            () => {
              this.modalWindow = null;
            },
            () => {
              this.modalWindow = null;
              this.store.dispatch(new NoteDeleteCancel());
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

          this.note = null;
        }
      }
    );

    this.deletedSubscription = this.store.pipe(
      select(state => state.note),
      filter(result => !!result),
      select(note => note.lastDeletedNote)
    ).subscribe(
      (note: Note) => {
        if (note !== null)
        {
          if (this.modalWindow !== null)
          {
            this.modalWindow.close();
            this.modalWindow = null;
          }

          this.note = null;
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.deletingSubscription.unsubscribe();
    this.deletedSubscription.unsubscribe();
  }


  onCancelClickHandler()
  {
    this.store.dispatch(new NoteDeleteCancel());
  }

  onRemoveClickHandler()
  {
    this.store.dispatch(new NoteDeleteStart(this.note));
  }
}
