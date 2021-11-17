import { AuthApi, Configuration, UserApi } from '@/app/apiclient';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig } from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    public overlay: Overlay,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
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
   * ログインAPIにリクエストする
   */
  public async submit() {
    if (!this.formGroup.valid) {
      // バリデーションエラーが存在する場合
      return;
    }

    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
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
        this.authService.logined(loginResponse.headers.authorization, meResponse.data.name, meResponse.data.id);
      }

      this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);

      this.snackBar.open('ログインに失敗しました', '閉じる', { verticalPosition: 'top' });

      this.email.setErrors({ faildLogin: true });
      this.password.setErrors({ faildLogin: true });
    }

    this.overlayRef.detach();
  }
}
