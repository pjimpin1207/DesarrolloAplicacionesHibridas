import { Component, OnInit } from '@angular/core';
import { IonicModule, IonToggle, IonInput, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjustesPage implements OnInit {

  darkMode = false;
  nombreUsuario: string = '';

  constructor(
    private settings: SettingsService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.darkMode = await this.settings.getDarkMode();
    this.nombreUsuario = await this.settings.getUserName();
  }

  async guardarCambios() {
    await this.settings.setDarkMode(this.darkMode);
    await this.settings.setUserName(this.nombreUsuario);

    const toast = await this.toastController.create({
      message: 'Ajustes guardados',
      duration: 2000,
      color: 'success'
    });
    toast.present();

    document.body.classList.toggle('dark', this.darkMode);
  }

}
