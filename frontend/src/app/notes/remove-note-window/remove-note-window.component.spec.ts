import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNoteWindowComponent } from './remove-note-window.component';

describe('RemoveNoteWindowComponent', () => {
  let component: RemoveNoteWindowComponent;
  let fixture: ComponentFixture<RemoveNoteWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveNoteWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveNoteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
