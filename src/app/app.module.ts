import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './admin-login/login.service';
import {AppRouter} from './app.router';
import { AddPhotosComponent } from './add-photos/add-photos.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule} from 'angularfire2';
import { environment} from '../environments/environment.prod';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {PhotosServer} from './add-photos/Photos.server';
import {HttpModule} from '@angular/http';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
import {UploadService} from './upload.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HeaderComponent,
    AddPhotosComponent,
    AddProjectsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouter,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'swa-interior'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    AngularFireStorageModule,
    HttpModule
  ],
  providers: [LoginService, PhotosServer , UploadService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
