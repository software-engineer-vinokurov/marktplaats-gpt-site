import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ActionsComponent, SettingsComponent } from 'negotiate-ninja-lib';
import { AboutComponent } from 'negotiate-ninja-lib';
import { HelpComponent } from 'negotiate-ninja-lib';
import { BalanceComponent } from 'negotiate-ninja-lib';
import { UsageComponent } from 'negotiate-ninja-lib';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Landing Page',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings',
    canActivate: [authGuardFn],
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'help',
    component: HelpComponent,
    title: 'Help',
  },
  {
    path: 'balance',
    component: BalanceComponent,
    title: 'Balance',
    canActivate: [authGuardFn],
  },
  {
    path: 'usage',
    component: UsageComponent,
    title: 'Usage',
    canActivate: [authGuardFn],
  },
  {
    path: 'actions',
    component: ActionsComponent,
    title: 'Actions',
  }
];
