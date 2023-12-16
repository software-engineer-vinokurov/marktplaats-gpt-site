import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { BalanceComponent } from './balance/balance.component';

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
  },
];
