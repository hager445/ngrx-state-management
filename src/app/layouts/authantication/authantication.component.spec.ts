import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthanticationComponent } from './authantication.component';

describe('AuthanticationComponent', () => {
  let component: AuthanticationComponent;
  let fixture: ComponentFixture<AuthanticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthanticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthanticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
