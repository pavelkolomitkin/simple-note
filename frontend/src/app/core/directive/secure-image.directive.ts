import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appSecureImage]'
})
export class SecureImageDirective implements OnInit, OnDestroy {

  @Input('secureUrl') url: string;

  tokenSubscription: Subscription;

  constructor(private element: ElementRef, private store: Store<State>) {

  }

  ngOnInit(): void {
    this.tokenSubscription = this.store.pipe(select(state => state.security.authorizedToken)).subscribe(
      (token: string) => {
        debugger
        // TODO remove http://localhost:7777/
        this.element.nativeElement.src = this.url + '?token=' + token;
      }
    );
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

}
