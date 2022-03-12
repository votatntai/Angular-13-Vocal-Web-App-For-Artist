import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './main/home/home.component';
import { DetailComponent } from './main/jobs/detail/detail.component';
import { JobsComponent } from './main/jobs/jobs.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './main/profile/profile.component';
import { RecordComponent } from './main/record/record.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'record',
        component: RecordComponent
      },
      {
        path: 'jobs/detail/:id',
        component: DetailComponent
      },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
