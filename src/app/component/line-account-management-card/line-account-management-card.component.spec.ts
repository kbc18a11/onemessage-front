import { GetLineAccountResponse, LineApi } from '@/app/apiclient';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LineAccountManagementCardComponent } from './line-account-management-card.component';

describe('LineAccountManagementCardComponent', () => {
  let component: LineAccountManagementCardComponent;
  let fixture: ComponentFixture<LineAccountManagementCardComponent>;

  const testLineAccount: GetLineAccountResponse = {
    displayName: 'testName',
    pictureUrl: 'testImageUrl'
  };
  const testChannelToken = 'token';

  beforeEach(async () => {
    // LINEアカウント情報登録APIをモック化
    spyOn(LineApi.prototype, 'createLineAccount')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: testLineAccount,
          status: 201,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    // LINEアカウント情報取得APIをモック化
    spyOn(LineApi.prototype, 'getLineAccount')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: testLineAccount,
          status: 200,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    // LINEアカウント情報削除APIをモック化
    spyOn(LineApi.prototype, 'deleteLineAccount')
      .and.returnValue(new Promise((resolve) => {
        resolve({
          data: undefined,
          status: 200,
          headers: null,
          statusText: '',
          config: {}
        });
      }));

    await TestBed.configureTestingModule({
      declarations: [LineAccountManagementCardComponent],
      imports: [
        OverlayModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LineAccountManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    //expect(LineAccountManagementCardComponent.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
    expect(component.lineAccount).toEqual(testLineAccount);
    expect(LineApi.prototype.getLineAccount).toHaveBeenCalledTimes(1);
  });

  it('バリデーションの検証', () => {
    component.lineAccount = null;

    // チャネルアクセストークンの検証
    const input = fixture.debugElement.query(By.css('[name=channel-token]')).nativeElement as HTMLInputElement;

    input.value = testChannelToken;
    input.dispatchEvent(new Event('input'));
    expect(component.channelToken.value).toBe(testChannelToken);
    expect(component.channelToken.valid).toBeTruthy();
  });

  it('LINEアカウント情報の登録', async () => {
    // チャネルアクセストークンの入力
    const input = fixture.debugElement.query(By.css('[name=channel-token]')).nativeElement as HTMLInputElement;
    input.value = testChannelToken;
    input.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('.submit-button')).nativeElement as HTMLButtonElement;
    await submitButton.click();

    expect(component.lineAccount).toEqual(testLineAccount);

    expect(LineApi.prototype.createLineAccount).toHaveBeenCalledTimes(1);
    expect(LineApi.prototype.createLineAccount).toHaveBeenCalledWith({
      channelToken: component.channelToken.value,
    });
  });
});
