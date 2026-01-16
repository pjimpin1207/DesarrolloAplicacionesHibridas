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
      try {
        // 👉 CAMBIO: Esperamos (await) la respuesta del servidor
        this.noticia = await this.noticiaService.getNoticiaPorId(Number(id));
      } catch (error) {
        // 👉 Si hay error (ej: 404 no encontrado), entra aquí
        console.error('Error al cargar la noticia:', error);
        this.mostrarMensajeError();
      }
    }
  }

  // He separado tu lógica de error para limpiar el ngOnInit y usarla en el catch
  async mostrarMensajeError() {
    const toast = await this.toastController.create({
      message: 'Noticia no encontrada',
      duration: 2000,
      color: 'danger'
    });

    await toast.present();

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
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
              // 👉 CAMBIO: Añadimos await porque el servicio ahora es asíncrono
              await this.noticiaService.deleteNoticia(this.noticia.id);
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