import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAttachmentComponent } from './completed-attachment.component';

describe('CompletedAttachmentComponent', () => {
  let component: CompletedAttachmentComponent;
  let fixture: ComponentFixture<CompletedAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
