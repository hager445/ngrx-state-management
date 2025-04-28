import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCounterComponent } from './live-counter.component';

describe('LiveCounterComponent', () => {
  let component: LiveCounterComponent;
  let fixture: ComponentFixture<LiveCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
