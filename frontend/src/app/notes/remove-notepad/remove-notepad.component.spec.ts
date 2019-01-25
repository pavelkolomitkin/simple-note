import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNotepadComponent } from './remove-notepad.component';

describe('RemoveNotepadComponent', () => {
  let component: RemoveNotepadComponent;
  let fixture: ComponentFixture<RemoveNotepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveNotepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
