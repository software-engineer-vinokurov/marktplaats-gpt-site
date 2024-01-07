import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ActionsComponent, SettingsComponent } from 'negotiate-ninja-lib';
import { HelpComponent } from 'negotiate-ninja-lib';
import { BalanceComponent } from 'negotiate-ninja-lib';
import { UsageComponent } from 'negotiate-ninja-lib';
import { ExtensionLoginComponent } from './extension-login/extension-login.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { PersonalInviteComponent } from './personal-invite/personal-invite.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Negotiate Ninja. Adding ChatGPT to any web chat',
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
  },
  {
    path: 'extension/login',
    component: ExtensionLoginComponent,
    title: 'Extension Login',
    canActivate: [authGuardFn],
  },
  {
    path: 'extension/signup',
    component: ExtensionLoginComponent,
    title: 'Extension Signup',
  },
  {
    path: 'extension/logout',
    component: ExtensionLoginComponent,
    title: 'Extension Logout',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [authGuardFn],
  },
  {
    path: 'invite',
    component: PersonalInviteComponent,
    title: 'Invite',
  },
];
