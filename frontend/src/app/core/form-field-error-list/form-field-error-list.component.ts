import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-form-field-error-list',
  templateUrl: './form-field-error-list.component.html',
  styleUrls: ['./form-field-error-list.component.css']
})
export class FormFieldErrorListComponent implements OnInit {

  _errorStore: Observable<{}>;

  @Input('field') fieldName: string;

  constructor() { }

  @Input('errors') set errorStore(errors: any)
  {
    if (!(errors instanceof Observable))
    {
      this._errorStore = of(errors);
    }
    else
    {
      this._errorStore = errors;
    }
  }

  ngOnInit() {

  }

}
