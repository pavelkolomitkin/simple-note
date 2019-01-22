import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotifierComponent } from './message-notifier.component';

describe('MessageNotifierComponent', () => {
  let component: MessageNotifierComponent;
  let fixture: ComponentFixture<MessageNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
