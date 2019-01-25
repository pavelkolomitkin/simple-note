import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import LoginCredentials from '../data/model/login-credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() errors: Object;

  @Output() onSubmitEvent: EventEmitter<LoginCredentials> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    const credentials: LoginCredentials = {
      email: form.value.email,
      password: form.value.password
    };

    this.onSubmitEvent.emit(credentials);
  }

}
