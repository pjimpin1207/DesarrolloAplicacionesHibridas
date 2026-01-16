import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController, AnimationController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaItemComponent } from '../components/noticia-item/noticia-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';
import { NoticiaService } from '../services/noticia.service';
import { RouterLink, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NoticiaItemComponent,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  noticias: Noticia[] = [];
  nombreUsuario: string = '';

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
    private animationCtrl: AnimationController,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  async ngOnInit() {
    this.nombreUsuario = await this.settingsService.getUserName();
  }

  async ionViewWillEnter() {
    await this.cargarNoticias();
  }

  async cargarNoticias() {
    try {
      this.noticias = await this.noticiaService.getNoticias();
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
    }
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

  navegarAAbout() {
    console.log("Realizando operaciones previas...");
    console.log("Navegando a la página About...");
    this.router.navigate(['/about']);
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
            // 👉 INICIO DEL CAMBIO DEL PASO 2
            try {
              // 1. Llamamos al servicio pasando EL OBJETO COMPLETO y esperamos (await)
              await this.noticiaService.addNoticia(this.nuevaNoticia);

              // 2. Limpiamos el formulario reseteando el objeto
              this.nuevaNoticia = {
                id: 0,
                titulo: '',
                descripcion: '',
                imagen: '',
                esUrgente: false,
                categoria: '',
                fecha: new Date()
              };

              // 3. Recargamos la lista desde el servidor para mostrar los cambios
              await this.cargarNoticias();

              // (Opcional) Cerramos el modal si estaba abierto
              this.cerrarModal();

              const toast = await this.toastController.create({
                message: 'Noticia publicada correctamente',
                duration: 2500,
                color: 'success',
              });
              await toast.present();

            } catch (error) {
              console.error('Error al guardar:', error);
            }
            // 👈 FIN DEL CAMBIO
          }
        }
      ]
    });

    await alert.present();
  }
}