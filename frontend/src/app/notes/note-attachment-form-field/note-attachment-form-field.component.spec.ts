import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAttachmentFormFieldComponent } from './note-attachment-form-field.component';

describe('NoteAttachmentFormFieldComponent', () => {
  let component: NoteAttachmentFormFieldComponent;
  let fixture: ComponentFixture<NoteAttachmentFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteAttachmentFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAttachmentFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
