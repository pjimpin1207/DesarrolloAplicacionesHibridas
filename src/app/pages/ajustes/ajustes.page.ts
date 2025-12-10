import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    FormsModule,

    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonToggle,
    IonInput,
    IonButton
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;
  nombreUsuario: string = "";

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.aplicarTema(this.modoOscuro);

    this.nombreUsuario = await this.settingsService.get('nombre_usuario') || "";
  }

  async cambiarModoOscuro() {
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    document.body.classList.toggle('dark', esOscuro);
  }

  async guardarNombre() {
    await this.settingsService.set('nombre_usuario', this.nombreUsuario);
  }
}
