import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const name = '山田太郎';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuWxseeUsOWkqumDjiIsImlhdCI6MTUxNjIzOTAyMn0.T4S-bamAc3S8JcSa-thOitDDp4mH8m9ObdewD7QouaI';


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    // ローカルストレージのモック化
    spyOn(localStorage.__proto__, 'setItem').and.returnValue(null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ログインの検証', () => {
    service.logined(token, name);

    expect(service.name).toBe(name);
    expect(service.token).toBe(token);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorage.setItem).toHaveBeenCalledWith('name', name);
  });
});
