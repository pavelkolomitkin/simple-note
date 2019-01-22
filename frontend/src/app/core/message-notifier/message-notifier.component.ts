import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {NotifyMessage} from "../data/model/notify-message.model";

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.css']
})
export class MessageNotifierComponent implements OnInit {

  static MAX_STACK_SIZE = 10;

  messageStack: Array<NotifyMessage> = [];

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.store.pipe(select(state => state.core.lastSuccessMessage)).subscribe(
      (message: NotifyMessage) => {
        this.rotateMessage(message);
      }
    );

    this.store.pipe(select(state => state.core.lastErrorMessage)).subscribe(
      (message: NotifyMessage) => {
        this.rotateMessage(message);
      }
    );
  }

  rotateMessage = (message: NotifyMessage) =>
  {
    if (this.messageStack.length >= MessageNotifierComponent.MAX_STACK_SIZE)
    {
      this.messageStack.splice(-1, 1);
    }

    this.messageStack = [message, ...this.messageStack];
  }
}
