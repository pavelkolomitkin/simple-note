import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../app.state';
import User from '../model/user.model';
import {Subscription} from 'rxjs';
import {UserLogout} from "../../security/data/actions";
import {NotePadCreationInit} from "../../notes/data/note-pad.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User = null;
  userSubscription: Subscription;

  isCollapsed: boolean = true;

  constructor(private store: Store<State>, private elementRef: ElementRef) {

    this.userSubscription = store.pipe(select(state => state.security.authorizedUser)).subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  ngOnInit() {

  }

  @HostListener('document:click', ['$event']) onOutsideClickHandler = (event) => {
    if (!this.elementRef.nativeElement.contains(event.target))
    {
      this.isCollapsed = true;
    }
  }

  onMenuItemClickHandler()
  {
    this.isCollapsed = true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogoutClickHandler()
  {
    this.store.dispatch(new UserLogout());
  }

  onAddNotePadClickHandler()
  {
    this.store.dispatch(new NotePadCreationInit());
  }

}
