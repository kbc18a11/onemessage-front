import { UserApi } from '@/apiclient';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  // フォームオブジェクト関係
  let formGroup: FormGroup;
  let nameFormControl: FormControl;
  let emailFormControl: FormControl;
  let passwordFormControl: FormControl;
  let confirmPasswordFormControl: FormControl;

  // 入力フォームのhtml
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formGroup = component.formGroup;

    nameFormControl = component.name;
    emailFormControl = component.email;
    passwordFormControl = component.password;
    confirmPasswordFormControl = component.confirmPassword;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('バリデーションの検証', () => {

    // フォーム入力のテストデータ
    const inputNameValue = '山田　太郎';
    const inputEmailValue = 'example@example.com';
    const inputPasswordValue = 'inputPassword';
    const inputConfirmPasswordValue = 'inputPassword';

    // 名前の検証
    input = fixture.debugElement.query(By.css('[name=name]')).nativeElement as HTMLInputElement;

    input.value = inputNameValue;
    input.dispatchEvent(new Event('input'));

    expect(nameFormControl.value).toBe(inputNameValue);
    expect(nameFormControl.valid).toBeTruthy();

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

    expect(passwordFormControl.value).toBe(inputPasswordValue);
    expect(passwordFormControl.valid).toBeTruthy();

    // パスワードの確認の検証
    input = fixture.debugElement.query(By.css('[name=confirm-password]')).nativeElement as HTMLInputElement;

    input.value = inputConfirmPasswordValue;
    input.dispatchEvent(new Event('input'));

    expect(passwordFormControl.value).toBe(inputConfirmPasswordValue);
    expect(passwordFormControl.valid).toBeTruthy();

    // 全てのバリデーションにエラーが発生していないか?
    expect(formGroup.valid).toBeTruthy();
  });
});
