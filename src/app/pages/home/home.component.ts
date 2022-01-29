import { Configuration, DmApi, GetDmResponseMessages } from '@/app/apiclient';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dmHistories: GetDmResponseMessages[] = [];

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getDmHistory();
  }


  /**
   * dm送信履歴を取得する
   *
   * @returns
   */
  async getDmHistory() {
    try {
      const response = await new DmApi(new Configuration({ basePath: environment.apiUrl, apiKey: this.authService.token }))
        .getDm();

      if (response.status !== 200) throw new Error();

      this.dmHistories = response.data.messages;
    } catch (e) {
      console.error(e);

      if (e.response.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return;
      }

      this.snackBar.open(
        'メッセージを履歴を取得することができませんでした。大変申し訳ございませんが、画面を再読み込みを行ってください。'
        + 'それでも解除できない場合は、お手数をおかけいたしますが、運営に問い合わせをよろしくお願いします。',
        '閉じる',
        { verticalPosition: 'top' }
      );
    }
  }

  dateTimeFormatter(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);

    return `${dateTime.getFullYear()}年${dateTime.getMonth()}月${dateTime.getDay()}日${dateTime.getHours()}時${dateTime.getMinutes()}分`
  }
}
