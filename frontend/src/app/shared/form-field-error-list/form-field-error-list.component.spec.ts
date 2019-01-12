import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldErrorListComponent } from './form-field-error-list.component';

describe('FormFieldErrorListComponent', () => {
  let component: FormFieldErrorListComponent;
  let fixture: ComponentFixture<FormFieldErrorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldErrorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldErrorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
