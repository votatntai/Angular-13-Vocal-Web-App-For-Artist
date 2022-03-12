import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './main/profile/profile.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { FooterComponent } from './main/footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { RecordComponent } from './main/record/record.component';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AvatarComponent } from './main/profile/avatar/avatar.component';
import { JobsComponent } from './main/jobs/jobs.component';
import { DetailComponent } from './main/jobs/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    ProfileComponent,
    NavigationComponent,
    FooterComponent,
    ErrorComponent,
    RecordComponent,
    ForgetPasswordComponent,
    AvatarComponent,
    JobsComponent,
    DetailComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgAudioRecorderModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
