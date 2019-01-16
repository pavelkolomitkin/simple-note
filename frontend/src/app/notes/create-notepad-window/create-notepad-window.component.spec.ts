import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotepadWindowComponent } from './create-notepad-window.component';

describe('CreateNotepadWindowComponent', () => {
  let component: CreateNotepadWindowComponent;
  let fixture: ComponentFixture<CreateNotepadWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotepadWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotepadWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
