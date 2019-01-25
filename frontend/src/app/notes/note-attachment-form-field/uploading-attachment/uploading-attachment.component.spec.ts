import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingAttachmentComponent } from './uploading-attachment.component';

describe('UploadingAttachmentComponent', () => {
  let component: UploadingAttachmentComponent;
  let fixture: ComponentFixture<UploadingAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
