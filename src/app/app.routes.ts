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
import { GetStartedComponent } from './get-started/get-started.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxMarktplaatsNlComponent } from './sandbox/sandbox-marktplaats.nl/sandbox-marktplaats.nl.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Negotiate Ninja. Adding ChatGPT to any web chat',
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
    title: 'Negotiate Ninja. Calling Back',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Negotiate Ninja. Settings',
    canActivate: [authGuardFn],
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Negotiate Ninja',
  },
  {
    path: 'help',
    component: HelpComponent,
    title: 'Negotiate Ninja. Help',
  },
  {
    path: 'balance',
    component: BalanceComponent,
    title: 'Negotiate Ninja. Balance',
    canActivate: [authGuardFn],
  },
  {
    path: 'usage',
    component: UsageComponent,
    title: 'Negotiate Ninja. Usage',
    canActivate: [authGuardFn],
  },
  {
    path: 'get-started/new-user',
    component: GetStartedComponent,
    title: 'Get Started with Negotiate Ninja',
    canActivate: [authGuardFn],
  },
  {
    path: 'get-started',
    component: GetStartedComponent,
    title: 'Get Started with Negotiate Ninja',
    canActivate: [authGuardFn],
  },
  {
    path: 'actions',
    component: ActionsComponent,
    title: 'Negotiate Ninja. Actions',
  },
  {
    path: 'extension/login',
    component: ExtensionLoginComponent,
    title: 'Negotiate Ninja. Extension Login',
    canActivate: [authGuardFn],
  },
  {
    path: 'extension/signup',
    component: ExtensionLoginComponent,
    title: 'Negotiate Ninja. Extension Signup',
  },
  {
    path: 'extension/logout',
    component: ExtensionLoginComponent,
    title: 'Negotiate Ninja. Extension Logout',
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
    title: 'Negotiate Ninja. Sandbox',
    canActivate: [authGuardFn],
    children: [
      {
        path: 'marktplaats-nl/:intention',
        title: 'Negotiate Ninja. Sandbox for marktplaats.nl',
        component: SandboxMarktplaatsNlComponent,
      },
      {
        path: 'marktplaats-nl',
        redirectTo: 'marktplaats-nl/selling',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Negotiate Ninja. Admin',
    canActivate: [authGuardFn],
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Negotiate Ninja. Account',
    canActivate: [authGuardFn],
  },
];
