import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadListItemComponent } from './notepad-list-item.component';

describe('NotepadListItemComponent', () => {
  let component: NotepadListItemComponent;
  let fixture: ComponentFixture<NotepadListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotepadListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
