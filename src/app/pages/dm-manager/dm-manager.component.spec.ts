import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DmManagerComponent } from './dm-manager.component';

describe('DmManagerComponent', () => {
  let component: DmManagerComponent;
  let fixture: ComponentFixture<DmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmManagerComponent],
      imports: [
        MatDialogModule,
        OverlayModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
