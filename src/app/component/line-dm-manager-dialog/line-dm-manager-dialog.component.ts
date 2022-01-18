import { Configuration, LineApi, PostDmRequestAddresses } from '@/app/apiclient';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * チェックボックス上の友達情報
 */
export interface checkboxFriendsData {
  id: string;
}

@Component({
  selector: 'app-line-dm-manager-dialog',
  templateUrl: './line-dm-manager-dialog.component.html',
  styleUrls: ['./line-dm-manager-dialog.component.css']
})
export class LineDmManagerDialogComponent implements OnInit {
  friends: checkboxFriendsData[] = [];
  friendsTotal = 0;
  checkedFriends: PostDmRequestAddresses[] = [];
  isNotCertified = false;
  offset = 0;

  formGroup = new FormGroup({
    lineId: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<string[]>
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  get lineId() {
    return <FormControl>this.formGroup.get('lineId');
  }

  /**
   * 未認証アカウントの送信先LINEIDの追加
   *
   * @returns
   */
  addLineId() {
    if (!this.formGroup.valid) {
      return;
    }

    this.checkedFriends.push({ id: this.lineId.value });
  }

  /**
   * トグルボタンの切り替え
   *
   * @param $event
   */
  toggleChanges($event: MatSlideToggleChange) {
    this.isNotCertified = $event.checked;
  }

  /**
 * フォロワーを取得する
 */
  async getFriends() {
    try {
      const response = await new LineApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getLineAccountFriends(this.offset, 10);

      if (response.status !== 200) throw new Error();

      this.friends = response.data.friends.map(friend => {
        return {
          id: friend.id
        }
      });

      this.friendsTotal = response.data.total;
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
        'LINE友達情報を取得できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    }
  }

  /**
   * 選択されたIDを処理する
   * @param event
   */
  selectFriendIds(event: MatCheckboxChange) {
    if (event.checked) {
      this.checkedFriends.push({ id: event.source.value });
    } else {
      this.checkedFriends = this.checkedFriends.filter(friend => friend.id !== event.source.value);
    }
  }

  /**
   * ページネーションのデータを取得
   * @param event
   */
  async getPaginatorData(event: PageEvent) {
    this.offset = event.pageIndex * event.pageSize;

    await this.getFriends();
  }
}
