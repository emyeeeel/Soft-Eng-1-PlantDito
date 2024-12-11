import { Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('../login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('../signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'splash',
    loadChildren: () => import('../splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'aichat',
    loadComponent: () => import('../aichat/aichat.page').then(m => m.AichatPage)
  }
];

