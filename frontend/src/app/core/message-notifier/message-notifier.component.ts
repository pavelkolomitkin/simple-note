import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotifyMessage} from "../data/model/notify-message.model";
import {ToastrService} from "ngx-toastr";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.css']
})
export class MessageNotifierComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private toastr: ToastrService)
  {

  }

  ngOnInit() {

    this.store.pipe(select(state => state.core.lastSuccessMessage), filter(message => !!message)).subscribe(
      (message: NotifyMessage) => {
        this.toastr.success(message.text, 'Success!');
      }
    );

    this.store.pipe(select(state => state.core.lastErrorMessage), filter(message => !!message)).subscribe(
      (message: NotifyMessage) => {
        this.toastr.error(message.text, 'Oops!')
      }
    );
  }
}
