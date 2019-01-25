import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadableImageComponent } from './preloadable-image.component';

describe('PreloadableImageComponent', () => {
  let component: PreloadableImageComponent;
  let fixture: ComponentFixture<PreloadableImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadableImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
