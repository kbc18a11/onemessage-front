import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  name = '';

  constructor() {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken) {
      this.token = localStorageToken;
    }
  }

  logined(token: string, name: string) {
    this.token = token;
    this.name = name;

    // 次回自動ログイン用にローカルストレージにセット
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }
}
