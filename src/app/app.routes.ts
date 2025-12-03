import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalle-noticia',
    loadComponent: () => import('./pages/detalle-noticia/detalle-noticia.page').then( m => m.DetalleNoticiaPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
  {
  path: 'detalle-noticia/:id',
  loadComponent: () =>
    import('./pages/detalle-noticia/detalle-noticia.page')
      .then(m => m.DetalleNoticiaPage)
},
];
