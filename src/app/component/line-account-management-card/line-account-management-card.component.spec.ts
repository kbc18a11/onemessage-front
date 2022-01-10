import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LineAccountManagementCardComponent } from './line-account-management-card.component';

describe('LineAccountManagementCardComponent', () => {
  let component: LineAccountManagementCardComponent;
  let fixture: ComponentFixture<LineAccountManagementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineAccountManagementCardComponent],
      imports: [
        OverlayModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineAccountManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
