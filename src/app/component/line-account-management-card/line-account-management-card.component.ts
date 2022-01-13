import { Component, OnInit } from '@angular/core';
import { Configuration, GetLineAccountResponse, LineApi } from '@/app/apiclient/';
import { AuthService } from '@/app/services/auth/auth.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-line-account-management-card',
  templateUrl: './line-account-management-card.component.html',
  styleUrls: ['./line-account-management-card.component.css']
})
export class LineAccountManagementCardComponent implements OnInit {
  lineAccount: GetLineAccountResponse | null = null;

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  formGroup = new FormGroup({
    channelToken: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public overlay: Overlay,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAccountInfo();
  }

  get channelToken() {
    return <FormControl>this.formGroup.get('channelToken');
  }

  /**
   * LINEアカウント情報を取得
   * @returns
   */
  async getAccountInfo() {
    try {
      const response = await new LineApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getLineAccount();

      if (response.status !== 200) throw new Error();

      this.lineAccount = response.data;
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        // LINE情報がない場合
        return;
      }

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'LINEアカウント情報を取得できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    }
  }

  /**
   * LINEアカウントを登録する
   * @returns
   */
  async registerAccount() {
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
      const response = await new LineApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .createLineAccount({
          channelToken: this.channelToken.value,
        })

      if (response.status !== 201) throw new Error();

      this.lineAccount = response.data;
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        // LINE情報がない場合
        return;
      }

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'LINEアカウントを解除できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } finally {
      this.overlayRef.detach();
    }
  }

  /**
   * LINEアカウント情報を解除する
   * @returns
   */
  async detachAccount() {
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
      const response = await new LineApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .deleteLineAccount();

      if (response.status !== 200) throw new Error();

      this.lineAccount = null;
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        // LINE情報がない場合
        return;
      }

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'LINEアカウントを解除できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } finally {
      this.overlayRef.detach();
    }
  }
}
