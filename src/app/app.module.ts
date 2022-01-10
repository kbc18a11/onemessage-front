import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SocialAccountManagementComponent } from './pages/social-account-management/social-account-management.component';
import { TwitterAccountManagementCardComponent } from './component/twitter-account-management-card/twitter-account-management-card.component';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { DmManagerComponent } from './pages/dm-manager/dm-manager.component';
import { TwitterDmManagerDialogComponent } from './component/twitter-dm-manager-dialog/twitter-dm-manager-dialog.component';
import { LineAccountManagementCardComponent } from './component/line-account-management-card/line-account-management-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SocialAccountManagementComponent,
    TwitterAccountManagementCardComponent,
    DmManagerComponent,
    TwitterDmManagerDialogComponent,
    LineAccountManagementCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: environment.FREA_BASE_APIKEY,
      authDomain: environment.FREA_BASE_AUTH_DOMAIN,
      projectId: environment.FREA_BASE_PROJECT_ID,
      messagingSenderId: environment.FREA_BASE_MESSAGING_SENDER_ID,
      appId: environment.FREA_BASE_APP_ID
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
