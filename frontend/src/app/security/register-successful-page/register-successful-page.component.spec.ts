import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessfulPageComponent } from './register-successful-page.component';

describe('RegisterSuccessfulPageComponent', () => {
  let component: RegisterSuccessfulPageComponent;
  let fixture: ComponentFixture<RegisterSuccessfulPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccessfulPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccessfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
