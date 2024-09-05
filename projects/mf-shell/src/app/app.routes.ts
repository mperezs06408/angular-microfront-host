import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('mfShopping/CharactersModule').then((m) => m.AppComponent),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('mfPayment/PaymentModule').then((m) => m.AppComponent),
  },
];
