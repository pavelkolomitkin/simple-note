import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import RegisterData from "../data/model/register-data.model";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() validationErrors:{plainPassword: {}} = {
    plainPassword: {}
  };

  @Output('onSubmit') onSubmitEvent: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onSubmit(form:NgForm)
  {
    const { email, fullName, password, passwordRepeat } = form.value;

    const data: RegisterData = {
      email: email,
      fullName: fullName,
      plainPassword: {
        password: password,
        passwordRepeat: passwordRepeat
      }
    };

    this.onSubmitEvent.emit(data);
  }
}
