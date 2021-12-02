import { Configuration } from '@/app/apiclient';
import { GetTwitterAccountResponse, TwitterApi } from '@/app/apiclient/';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TwitterAuthProvider, OAuthCredential } from 'firebase/auth';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-twitter-account-management-card',
  templateUrl: './twitter-account-management-card.component.html',
  styleUrls: ['./twitter-account-management-card.component.css']
})
export class TwitterAccountManagementCardComponent implements OnInit {
  twitterAccount: GetTwitterAccountResponse | null = null;
  isAccounnt = false;

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public overlay: Overlay,
    public angularFireAuth: AngularFireAuth,
    public router: Router
  ) { }

  async ngOnInit() {
    try {
      // ユーザーのTwitter情報を取得
      const twitterAccountResponse = await new TwitterApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getTwitterAccount(this.authService.id);

      if (twitterAccountResponse.status !== 200) throw new Error();

      this.twitterAccount = twitterAccountResponse.data;
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        // Twitter情報がない場合
        return;
      }

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'Twitterアカウント情報を取得できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    }
  }

  /**
   * Twitterアカウントを登録する
   */
  async rigisterAccount() {
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
      // Twitterにサインイン
      const signInResult = await this.angularFireAuth.signInWithPopup(
        new TwitterAuthProvider()
      );

      const oAuthCredential = signInResult.credential?.toJSON() as OAuthCredential;

      if (!oAuthCredential.accessToken || !oAuthCredential.secret) throw new Error();

      // Twitterアクセストークンを登録
      const twitterAccessTokenResponse = await new TwitterApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .createTwitterAccessToken({
          accessToken: oAuthCredential.accessToken,
          secretKey: oAuthCredential.secret
        });

      if (twitterAccessTokenResponse.status !== 201) throw new Error();

      // ユーザーのTwitter情報を取得
      const twitterAccountResponse = await new TwitterApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getTwitterAccount(this.authService.id);

      if (twitterAccountResponse.status !== 200) throw new Error();

      this.twitterAccount = twitterAccountResponse.data;

      this.snackBar.open('Twitterアカウントの登録が完了しました。', '閉じる', { verticalPosition: 'top' });
    } catch (e) {
      console.error(e);

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'Twitterアカウントを登録できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } finally {
      this.overlayRef.detach();
    }
  }

  /**
   * Twitterアカウントをデタッチ
   */
  async detachAccount() {
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    try {
      // Twitterのアクセストークンを削除
      const twitterAccountResponse = await new TwitterApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .deleteTwitterAccessToken();

      if (twitterAccountResponse.status !== 200) throw new Error();

      //　アカウント情報を削除する
      this.twitterAccount = null;
      this.snackBar.open('Twitterアカウントの解除が完了しました。', '閉じる', { verticalPosition: 'top' });
    } catch (e) {
      console.error(e);

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'Twitterアカウント情報を解除できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度解除を行ってください。'
        + 'それでも解除できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } finally {
      this.overlayRef.detach();
    }
  }
}
