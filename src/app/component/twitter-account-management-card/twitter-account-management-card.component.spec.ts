import { TwitterApi } from '@/apiclient';
import { AuthService } from '@/app/services/auth/auth.service';
import { environment } from '@/environments/environment';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TwitterAuthProvider } from 'firebase/auth';

import { TwitterAccountManagementCardComponent } from './twitter-account-management-card.component';

describe('TwitterAccountManagementCardComponent', () => {
  let component: TwitterAccountManagementCardComponent;
  let fixture: ComponentFixture<TwitterAccountManagementCardComponent>;

  const userId = 'userId';
  const userName = '山田太郎';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuWxseeUsOWkqumDjiIsImlhdCI6MTUxNjIzOTAyMn0.T4S-bamAc3S8JcSa-thOitDDp4mH8m9ObdewD7QouaI';

  const screenName = 'testName';
  const accountUrl = 'https://test/test';
  const profileImageURL = 'https://test/test.png';
  const accessToken = 'accessToken';
  const secretKey = 'secretKey';

  beforeEach(async () => {
    // ローカルストレージの取得処理をモック化
    spyOn(localStorage.__proto__, 'getItem')
      .withArgs('userId').and.returnValue(userId)
      .withArgs('token').and.returnValue(token)
      .withArgs('name').and.returnValue(userName);

    // Twitterアカウント取得APIをモック化
    spyOn(TwitterApi.prototype, 'getTwitterAccount')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: {
            screenName: screenName,
            accountUrl: accountUrl,
            profileImageURL: profileImageURL
          },
          status: 200,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    // Twitterアクセストークン登録APIをモック化
    spyOn(TwitterApi.prototype, 'createTwitterAccessToken')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: undefined,
          status: 201,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    // Twitterアクセストークン削除APIをモック化
    spyOn(TwitterApi.prototype, 'deleteTwitterAccessToken')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: undefined,
          status: 200,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    // Twitterサインイン処理をモック化
    spyOn(AngularFireAuth.prototype, 'signInWithPopup')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          credential: {
            providerId: '',
            signInMethod: '',
            toJSON: () => {
              return {
                accessToken: accessToken,
                secret: secretKey
              };
            }
          },
          user: null
        });
      }));

    await TestBed.configureTestingModule({
      declarations: [TwitterAccountManagementCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        OverlayModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp({
          apiKey: environment.FREA_BASE_APIKEY,
          authDomain: environment.FREA_BASE_AUTH_DOMAIN,
          projectId: environment.FREA_BASE_PROJECT_ID,
          messagingSenderId: environment.FREA_BASE_MESSAGING_SENDER_ID,
          appId: environment.FREA_BASE_APP_ID,
        }),
        AngularFireAuthModule,
        BrowserAnimationsModule
      ],
      providers: [
        AngularFireAuth,
        AuthService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitterAccountManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.twitterAccount?.accountUrl).toBe(accountUrl);
    expect(component.twitterAccount?.profileImageURL).toBe(profileImageURL);
    expect(component.twitterAccount?.screenName).toBe(screenName);
    expect(TwitterApi.prototype.getTwitterAccount).toHaveBeenCalledTimes(1);
    expect(TwitterApi.prototype.getTwitterAccount).toHaveBeenCalledWith(userId);

    expect(component.authService.id).toBe(userId);
    expect(component.authService.name).toBe(userName);
    expect(component.authService.token).toBe(token);
    expect(component.authService.isLogin).toBeTruthy();
    expect(localStorage.getItem).toHaveBeenCalledTimes(3);
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(localStorage.getItem).toHaveBeenCalledWith('name');
  });

  it('Twitterアカウントの登録の検証', async () => {
    await component.rigisterAccount();

    expect(AngularFireAuth.prototype.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(AngularFireAuth.prototype.signInWithPopup).toHaveBeenCalledWith(new TwitterAuthProvider());

    expect(TwitterApi.prototype.createTwitterAccessToken).toHaveBeenCalledTimes(1);
    expect(TwitterApi.prototype.createTwitterAccessToken).toHaveBeenCalledWith({
      accessToken: accessToken,
      secretKey: secretKey
    })

    expect(TwitterApi.prototype.getTwitterAccount).toHaveBeenCalledTimes(2);
    expect(TwitterApi.prototype.getTwitterAccount).toHaveBeenCalledWith(userId);

    expect(component.twitterAccount?.accountUrl).toBe(accountUrl);
    expect(component.twitterAccount?.profileImageURL).toBe(profileImageURL);
    expect(component.twitterAccount?.screenName).toBe(screenName);
  });

  it('Twitterアカウントの解除の検証', async () => {
    component.twitterAccount = {
      screenName: screenName,
      accountUrl: accountUrl,
      profileImageURL: profileImageURL
    };

    await component.detachAccount();

    expect(TwitterApi.prototype.deleteTwitterAccessToken).toHaveBeenCalledTimes(1);

    expect(component.twitterAccount).toBeNull();
  });
});
