import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountManagementComponent } from './social-account-management.component';

describe('SocialAccountManagementComponent', () => {
  let component: SocialAccountManagementComponent;
  let fixture: ComponentFixture<SocialAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAccountManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
