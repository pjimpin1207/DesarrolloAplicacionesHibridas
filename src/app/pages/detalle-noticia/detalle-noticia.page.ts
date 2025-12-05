import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interfaces/noticia';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonImg,
  IonBadge,
  IonButton,
  IonAlert,
} from '@ionic/angular/standalone';

import { ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonImg,
    IonBadge,
    IonButton
  ],
})
export class DetalleNoticiaPage implements OnInit {

  noticia: Noticia | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private noticiaService: NoticiaService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.noticia = this.noticiaService.getNoticiaPorId(Number(id));
    }

    // Manejo de error → noticia no encontrada
    if (!this.noticia) {
      const toast = await this.toastController.create({
        message: 'Noticia no encontrada',
        duration: 2000,
        color: 'danger'
      });

      await toast.present();

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);

      return;
    }
  }

  // Botón Eliminar con confirmación
  async eliminarNoticia() {
    const alert = await this.alertController.create({
      header: 'Eliminar noticia',
      message: '¿Seguro que deseas eliminar esta noticia?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            if (this.noticia) {
              this.noticiaService.deleteNoticia(this.noticia.id);
            }

            const toast = await this.toastController.create({
              message: 'Noticia eliminada',
              duration: 2000,
              color: 'success'
            });

            await toast.present();

            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
