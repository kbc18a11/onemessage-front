import { AuthService } from '@/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFiller = false;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * ログアウト処理
   */
  logout() {
    this.authService.logout();

    // ログイン画面に遷移
    this.router.navigateByUrl('/login');
  }
}
