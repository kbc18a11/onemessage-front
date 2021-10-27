import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // フォームオブジェクト関係
  let formGroup: FormGroup;
  let emailFormControl: FormControl;
  let passwordFormControl: FormControl;

  // 入力フォームのhtml
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        OverlayModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formGroup = component.formGroup;

    emailFormControl = component.email;
    passwordFormControl = component.password;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('バリデーションの検証', () => {

    // フォーム入力のテストデータ
    const inputEmailValue = 'example@example.com';
    const inputPasswordValue = 'inputPassword';

    // メールアドレスの検証
    input = fixture.debugElement.query(By.css('[name=email]')).nativeElement as HTMLInputElement;

    input.value = inputEmailValue;
    input.dispatchEvent(new Event('input'));

    expect(emailFormControl.value).toBe(inputEmailValue);
    expect(emailFormControl.valid).toBeTruthy();

    // パスワードの検証
    input = fixture.debugElement.query(By.css('[name=password]')).nativeElement as HTMLInputElement;

    input.value = inputPasswordValue;
    input.dispatchEvent(new Event('input'));
  });
});
