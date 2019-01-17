import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotepadWindowComponent } from './edit-notepad-window.component';

describe('EditNotepadWindowComponent', () => {
  let component: EditNotepadWindowComponent;
  let fixture: ComponentFixture<EditNotepadWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotepadWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotepadWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
