import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { PhotoService } from 'src/app/services/photo.service'; // 👈 IMPORTAMOS EL SERVICIO DE FOTOS
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Necesario para usar *ngIf en el HTML

// Importamos los iconos
import { addIcons } from 'ionicons';
import { camera, personCircleOutline } from 'ionicons/icons';

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
  IonButton,
  IonAvatar,      // 👈 Añadido para la foto
  IonIcon,        // 👈 Añadido para la foto
  IonFabButton    // 👈 Añadido para el botón flotante
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, // 👈 Añadido

    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonToggle,
    IonInput, IonButton,
    IonAvatar, IonIcon, IonFabButton
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;
  nombreUsuario: string = "";
  fotoPerfil: string = "";

  constructor(
    private settingsService: SettingsService,
    private photoService: PhotoService
  ) {
    addIcons({ camera, personCircleOutline });
  }

  async ngOnInit() {
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.aplicarTema(this.modoOscuro);

    this.nombreUsuario = await this.settingsService.get('nombre_usuario') || "";

    this.fotoPerfil = await this.settingsService.get('foto_perfil') || "";
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

  // 
  async cambiarFoto() {
    const nuevaFoto = await this.photoService.tomarFoto();
    
    if (nuevaFoto) {
      this.fotoPerfil = nuevaFoto;
      
      await this.settingsService.set('foto_perfil', this.fotoPerfil);
    }
  }
}