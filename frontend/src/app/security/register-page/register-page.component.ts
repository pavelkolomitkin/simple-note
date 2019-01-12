import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import State from '../../app.state';
import {Observable} from "rxjs";
import {UserRegistrationStart} from "../data/actions";
import RegisterData from "../data/model/register-data.model";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  errors: Observable<{}> = new Observable();

  constructor(public store:Store<State>) {
    this.errors = this.store.pipe(select((state) => {
      //debugger
      return state.security.registerUserErrors;
    }));
  }

  ngOnInit() {
  }

  onFormSubmit(data:RegisterData)
  {
    this.store.dispatch(new UserRegistrationStart(data));
  }

}
