import { Configuration, PostDmRequestAddresses, TwitterApi } from '@/app/apiclient';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * チェックボックス上のフォロワー情報
 */
export interface checkboxFollowerData {
  id: string;
  screenName: string;
  accountUrl: string;
}

@Component({
  selector: 'app-twitter-dm-manager-dialog',
  templateUrl: './twitter-dm-manager-dialog.component.html',
  styleUrls: ['./twitter-dm-manager-dialog.component.css']
})
export class TwitterDmManagerDialogComponent implements OnInit {
  followers: checkboxFollowerData[] = [];
  followersTotal = 0;
  checkedfollowers: PostDmRequestAddresses[] = [];

  offset = 0;

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<string[]>,
  ) { }

  async ngOnInit() {

    await this.getFollowers();
  }

  /**
   * フォロワーを取得する
   */
  async getFollowers() {
    try {
      const response = await new TwitterApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getTwitterAccountFollowers(this.offset, 10);

      if (response.status !== 200) throw new Error();

      this.followers = response.data.followers.map(follower => {
        return {
          id: String(follower.id),
          screenName: follower.screenName,
          accountUrl: follower.accountUrl
        }
      });
      this.followersTotal = response.data.total;
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
        'Twitterフォロワー情報を取得できませんでした。大変申し訳ございませんが、画面を再読み込みを行って、もう一度登録を行ってください。'
        + 'それでも登録できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくおねがいします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    }
  }

  /**
   * 選択されたフォロワーIDを処理する
   * @param event
   */
  selectFollowerIds(event: MatCheckboxChange) {
    if (event.checked) {
      this.checkedfollowers.push({ id: event.source.value });
    } else {
      this.checkedfollowers = this.checkedfollowers.filter(follower => follower.id !== event.source.value);
    }
  }

  /**
   * ページネーションのデータを取得
   * @param event
   */
  async getPaginatorData(event: PageEvent) {
    this.offset = event.pageIndex * event.pageSize;

    await this.getFollowers();
  }
}
