import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAttachmentPreviewSmallComponent } from './note-attachment-preview-small.component';

describe('NoteAttachmentPreviewSmallComponent', () => {
  let component: NoteAttachmentPreviewSmallComponent;
  let fixture: ComponentFixture<NoteAttachmentPreviewSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteAttachmentPreviewSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAttachmentPreviewSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
