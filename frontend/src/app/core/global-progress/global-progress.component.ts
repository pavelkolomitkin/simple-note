import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-global-progress',
  templateUrl: './global-progress.component.html',
  styleUrls: ['./global-progress.component.css']
})
export class GlobalProgressComponent implements OnInit {

  @Input() isVisible: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
