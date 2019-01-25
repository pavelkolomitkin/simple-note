import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";

@Component({
  selector: 'app-preloadable-image',
  templateUrl: './preloadable-image.component.html',
  styleUrls: ['./preloadable-image.component.css']
})
export class PreloadableImageComponent implements OnInit, OnDestroy {

  static PROGRESS_STATE = 'progress';
  static COMPLETE_STATE = 'complete';
  static ERROR_STATE = 'error';

  currentState: string;

  @Input('source') source: string;

  securedSource: string = '';

  @Input('width') width: string;
  @Input('height') height: string;
  @Input('className') className: string;

  constructor(private store: Store<State>) {

    this.currentState = PreloadableImageComponent.PROGRESS_STATE;
  }

  ngOnInit() {

    this.store.pipe(select(state => state.security.authorizedToken)).subscribe(
      (token) => {
        const image = new Image();

        image.onload = (event) => {
          this.securedSource = image.src;
          this.currentState = PreloadableImageComponent.COMPLETE_STATE;
        };

        image.onerror = (error) => {
          this.currentState = PreloadableImageComponent.ERROR_STATE;
        };

        let imageUrl = this.source;
        if (imageUrl.indexOf('?') === -1)
        {
          imageUrl += '?'
        }
        else
        {
          imageUrl += '&'
        }

        image.src = imageUrl + 'token=' + token;
      }
    )

  }

  ngOnDestroy(): void {

  }

}
