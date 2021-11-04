import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Configuration, UserApi } from '@/app/apiclient';
import { environment } from '@/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '@/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9\d]{8,100}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchPassword
    ],
    )
  }
    , {
      validators: [this.matchPassword]
    });

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    public router: Router, public snackBar: MatSnackBar,
    public overlay: Overlay, public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  /**
   * フォームで入力された名前情報を取得
   */
  public get name() {
    return <FormControl>this.formGroup.get('name');
  }

  /**
   * フォームで入力されたメールアドレス情報を取得
   */
  public get email() {
    return <FormControl>this.formGroup.get('email');
  }

  /**
   * フォームで入力されたパスワード情報を取得
   */
  public get password() {
    return <FormControl>this.formGroup.get('password');
  }

  /**
   * フォームで入力されたパスワード確認情報を取得
   */
  public get confirmPassword() {
    return <FormControl>this.formGroup.get('confirmPassword');
  }

  /**
   * パスワードの確認のバリデーション
   * @param abstractControl
   */
  public matchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password')?.value;
    const confirmPassword = abstractControl.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      abstractControl.get('confirmPassword')?.setErrors({ notMatchPassword: true });

      return { notMatchPassword: true };
    }

    if (password !== confirmPassword) {
      abstractControl.get('confirmPassword')?.setErrors({ notMatchPassword: true });

      return { notMatchPassword: true };
    }

    abstractControl.get('confirmPassword')?.setErrors(null);

    return null;
  }

  /**
   * submit
   */
  public async submit() {
    if (!this.formGroup.valid) {
      // バリデーションエラーが存在する場合
      return;
    }

    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
      const response = await new UserApi(new Configuration({ basePath: environment.apiUrl }))
        .createMe({
          name: this.formGroup.get('name')?.value,
          email: this.formGroup.get('email')?.value,
          password: this.formGroup.get('password')?.value,
        });

      if (response.status !== 201) throw new Error();

      const loginConfig: AxiosRequestConfig = {
        method: 'post',
        url: `${environment.apiUrl}/login?email=${this.email.value}&password=${this.password.value}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const loginResponse = await axios(loginConfig);

      if (loginResponse.status !== 200) throw new Error();

      const meResponse = await new UserApi(new Configuration({ basePath: environment.apiUrl, apiKey: loginResponse.headers.authorization }))
        .getMe();

      if (meResponse.data.name) {
        // ログイン状態の状態を変更
        this.authService.logined(loginResponse.headers.authorization, meResponse.data.name);
      }

      this.router.navigateByUrl('/');

      this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);

      if (e.response.data.message === '登録済みのメールアドレスです') {
        // メールアドレスが登録済みだった場合
        this.email.setErrors({ registeredEmail: true });

        this.snackBar.open(e.response.data.message, '閉じる', { verticalPosition: 'top' });
      } else {
        this.snackBar.open('ユーザー登録に失敗しました', '閉じる', { verticalPosition: 'top' });
      }
    }

    this.overlayRef.detach();
  }
}
