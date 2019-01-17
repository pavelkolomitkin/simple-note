import {Component, Input, OnInit} from '@angular/core';
import {NotePad} from "../data/model/note-pad.model";

@Component({
  selector: 'app-notepad-list-item',
  templateUrl: './notepad-list-item.component.html',
  styleUrls: ['./notepad-list-item.component.css']
})
export class NotepadListItemComponent implements OnInit {

  @Input() notePad: NotePad;

  constructor() { }

  ngOnInit() {
  }

}
