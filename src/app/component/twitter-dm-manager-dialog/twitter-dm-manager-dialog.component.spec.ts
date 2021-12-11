import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterDmManagerDialogComponent } from './twitter-dm-manager-dialog.component';

describe('TwitterDmManagerDialogComponent', () => {
  let component: TwitterDmManagerDialogComponent;
  let fixture: ComponentFixture<TwitterDmManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterDmManagerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterDmManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
