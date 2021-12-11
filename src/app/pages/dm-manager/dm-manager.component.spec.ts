import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmManagerComponent } from './dm-manager.component';

describe('DmManagerComponent', () => {
  let component: DmManagerComponent;
  let fixture: ComponentFixture<DmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmManagerComponent ]
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
