import { Configuration, DmApi, PostDmRequestAddresses, PostDmRequestSendingAddresses, PostDmRequestSendingAddressesPlatformTypeEnum } from '@/app/apiclient';
import { LineDmManagerDialogComponent } from '@/app/component/line-dm-manager-dialog/line-dm-manager-dialog.component';
import { TwitterDmManagerDialogComponent } from '@/app/component/twitter-dm-manager-dialog/twitter-dm-manager-dialog.component';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface SendAdress {
  snsType: 'twitter' | 'line'
  adresses: string[];
}

@Component({
  selector: 'app-dm-manager',
  templateUrl: './dm-manager.component.html',
  styleUrls: ['./dm-manager.component.css']
})
export class DmManagerComponent implements OnInit {
  formGroup = new FormGroup({
    message: new FormControl('', [
      Validators.required,
    ]),
  });

  messagefaildError = false;

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  sendAdresses: PostDmRequestSendingAddresses[] = [
    {
      platformType: PostDmRequestSendingAddressesPlatformTypeEnum.Twitter,
      addresses: []
    },
    {
      platformType: PostDmRequestSendingAddressesPlatformTypeEnum.Line,
      addresses: []
    }
  ];

  constructor(
    public twitterDmManagerDialog: MatDialog,
    public lineDmManagerDialog: MatDialog,
    public router: Router, public snackBar: MatSnackBar,
    public overlay: Overlay, public authService: AuthService
  ) { }

  ngOnInit(): void { }

  /**
   * フォームで入力された送信メッセージ情報を取得
   */
  public get message() {
    return <FormControl>this.formGroup.get('message');
  }

  /**
   * twitter設定のダイアログを開く
   */
  openTwitterDmManagerDialog() {
    const twitterDmManagerDialogRef = this.twitterDmManagerDialog.open(TwitterDmManagerDialogComponent, {
      width: '50%',
    });

    twitterDmManagerDialogRef.afterClosed().subscribe((sendAdresses: PostDmRequestAddresses[] | undefined) => {
      if (!sendAdresses) return;

      const twitterSendAdress = this.sendAdresses.find(sendAdress => sendAdress.platformType === 'twitter');

      if (twitterSendAdress) {
        twitterSendAdress.addresses = sendAdresses;
        return;
      }
    });
  }

  /**
   * twitterの設定をリセットする
   */
  resetTwitterSettings() {
    const twitterIndex = 0;
    this.sendAdresses[twitterIndex].addresses = [];
  }

  /**
   * LINE設定のダイアログを開く
   */
  openLineDmManagerDialog() {
    const lineDmManagerDialogRef = this.lineDmManagerDialog.open(LineDmManagerDialogComponent, {
      width: '50%',
    });

    lineDmManagerDialogRef.afterClosed().subscribe((sendAdresses: PostDmRequestAddresses[] | undefined) => {
      if (!sendAdresses) return;

      const lineSendAdress = this.sendAdresses.find(sendAdress => sendAdress.platformType === 'line');

      if (lineSendAdress) {
        lineSendAdress.addresses = sendAdresses;
        return;
      }
    });
  }

  /**
   * LINEの設定をリセットする
   */
  resetLineSettings() {
    const lineIndex = 1;
    this.sendAdresses[lineIndex].addresses = [];
  }

  /**
   * submit
   */
  async submit() {
    if (!this.formGroup.valid) {
      if (this.message.hasError('required')) this.messagefaildError = true;
      return;
    }

    if (this.messagefaildError) this.messagefaildError = false;

    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    try {
      const response = await new DmApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .postDm({
          message: this.message.value,
          sendingAddresses: this.sendAdresses
        });

      if (response.status !== 200) throw new Error();

      this.snackBar.open(
        'メッセージを送信しました。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } catch (e) {
      console.error(e);

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'メッセージを送信することができませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう送信を行ってください。'
        + 'それでも解除できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    } finally {
      this.overlayRef.detach();
    }
  }
}
