import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationActionsComponent } from './notification-actions.component';

describe('NotificationActionsComponent', () => {
  let component: NotificationActionsComponent;
  let fixture: ComponentFixture<NotificationActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
