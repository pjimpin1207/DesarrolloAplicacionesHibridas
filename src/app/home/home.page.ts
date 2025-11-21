import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController, AnimationController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaItemComponent } from '../components/noticia-item/noticia-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NoticiaItemComponent,
    HeaderComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  noticias: Noticia[] = [];

  nuevaNoticia: Noticia = {
    id: 0,
    titulo: '',
    descripcion: '',
    imagen: '',
    esUrgente: false,
    categoria: '',
    fecha: new Date()
  };

  loading = true;
  modalAbierto = false;

  constructor(
    private noticiaService: NoticiaService,
    private toastController: ToastController,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    // Simular la carga de datos
    setTimeout(() => {
      this.noticias = this.noticiaService.getNoticias();
      this.loading = false;
    }, 1000);
  }

  ionViewDidEnter() {
    const grid = document.querySelector('ion-grid');
    if (grid) {
      const anim = this.animationCtrl
        .create()
        .addElement(grid)
        .duration(1000)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(40px)', 'translateY(0)');
      anim.play();
    }
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  async agregarNoticia() {
    if (
      !this.nuevaNoticia.titulo.trim() ||
      !this.nuevaNoticia.descripcion.trim() ||
      !this.nuevaNoticia.categoria
    ) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos obligatorios.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar publicación',
      message: `¿Deseas publicar la noticia "<strong>${this.nuevaNoticia.titulo}</strong>"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Publicar',
          handler: async () => {

            // <-- AÑADIR AL SERVICIO
            this.noticiaService.addNoticia(this.nuevaNoticia);

            // <-- RECARGAR LISTA DESDE EL SERVICIO
            this.noticias = this.noticiaService.getNoticias();

            // <-- RESETEAR FORMULARIO
            this.nuevaNoticia = {
              id: 0,
              titulo: '',
              descripcion: '',
              imagen: '',
              esUrgente: false,
              categoria: '',
              fecha: new Date()
            };

            const toast = await this.toastController.create({
              message: 'Noticia publicada correctamente',
              duration: 2500,
              color: 'success',
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }
}