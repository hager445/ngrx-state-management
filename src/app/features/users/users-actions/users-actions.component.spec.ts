import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersActionsComponent } from './users-actions.component';

describe('UsersActionsComponent', () => {
  let component: UsersActionsComponent;
  let fixture: ComponentFixture<UsersActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
