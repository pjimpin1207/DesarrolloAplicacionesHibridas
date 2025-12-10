import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    const modoOscuro = await this.settingsService.get('modo_oscuro');
    document.body.classList.toggle('dark', modoOscuro === true);
  }
}
