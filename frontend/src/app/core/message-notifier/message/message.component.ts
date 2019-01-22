import {Component, Input, OnInit} from '@angular/core';
import {NotifyMessage} from "../../data/model/notify-message.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: NotifyMessage;

  constructor() { }

  ngOnInit() {
  }

}
