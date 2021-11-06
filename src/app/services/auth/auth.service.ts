import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  name = '';
  isLogin = false;

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    const localStorageName = localStorage.getItem('name');

    if (localStorageToken && localStorageName) {
      // 以前のログイン情報が残っている場合
      this.token = localStorageToken;
      this.name = localStorageName;

      this.isLogin = true;
    }
  }

  /**
   * ログイン後、引数からログイン情報を保存する
   * @param token
   * @param name
   */
  logined(token: string, name: string) {
    // ログイン情報を挿入
    this.token = token;
    this.name = name;
    this.isLogin = true;

    // 次回自動ログイン用にローカルストレージにセット
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  /**
   * ログアウト処理
   */
  logout() {
    // ログイン情報を削除
    this.token = '';
    this.name = '';
    this.isLogin = false;

    // ローカルストレージ情報を削除
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }
}
