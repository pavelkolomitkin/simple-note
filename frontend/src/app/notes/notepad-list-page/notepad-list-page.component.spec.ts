import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadListPageComponent } from './notepad-list-page.component';

describe('NotepadListPageComponent', () => {
  let component: NotepadListPageComponent;
  let fixture: ComponentFixture<NotepadListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotepadListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
