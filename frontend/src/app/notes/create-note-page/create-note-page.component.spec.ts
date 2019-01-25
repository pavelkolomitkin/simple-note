import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotePageComponent } from './create-note-page.component';

describe('CreateNotePageComponent', () => {
  let component: CreateNotePageComponent;
  let fixture: ComponentFixture<CreateNotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
