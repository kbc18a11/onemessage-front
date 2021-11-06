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
    spyOn(localStorage.__proto__, 'getItem')
      .withArgs('token').and.returnValue(token)
      .withArgs('name').and.returnValue(name);
    spyOn(localStorage.__proto__, 'setItem').and.returnValue(null);
    spyOn(localStorage.__proto__, 'removeItem').and.returnValue(null);
  });

  it('コンストラクタの検証', () => {
    const constructorTestService = new AuthService();

    expect(constructorTestService).toBeTruthy();
    expect(constructorTestService.name).toBe(name);
    expect(constructorTestService.token).toBe(token);
    expect(constructorTestService.isLogin).toBeTruthy();
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(localStorage.getItem).toHaveBeenCalledWith('name');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ログインの検証', () => {
    service.logined(token, name);

    expect(service.name).toBe(name);
    expect(service.token).toBe(token);
    expect(service.isLogin).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorage.setItem).toHaveBeenCalledWith('name', name);
  });

  it('ログアウトの検証', () => {
    service.logout();

    expect(service.name).toBe('');
    expect(service.token).toBe('');
    expect(service.isLogin).toBeFalsy();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('name');
  });
});
