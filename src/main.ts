import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// ImportProvidersFrom
import { importProvidersFrom } from '@angular/core';

// Ionic Storage
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

// HttpClient para APIs REST
import { provideHttpClient } from '@angular/common/http';

// Importacion para la camara
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // habilitar HttpClient
    provideHttpClient(),

    // Ionic Storage
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),
  ],
});

// inicializar camara
defineCustomElements(window);