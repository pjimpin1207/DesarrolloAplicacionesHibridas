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
import { addIcons } from 'ionicons';
import { trash, add, create } from 'ionicons/icons';

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
  ) {
    // Registramos los iconos: trash (borrar), add (añadir) y create (editar)
    addIcons({ trash, add, create });
  }

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

  // Abre el modal vacío para crear
  abrirModal() {
    // Aseguramos que esté limpio por si acaso
    this.nuevaNoticia = {
      id: 0, titulo: '', descripcion: '', imagen: '',
      esUrgente: false, categoria: '', fecha: new Date()
    };
    this.modalAbierto = true;
  }

  // NUEVO: Carga los datos de una noticia existente y abre el modal
  prepararEdicion(noticia: Noticia) {
    // Copiamos la noticia para no modificar la lista visualmente antes de guardar
    this.nuevaNoticia = { ...noticia };
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
      header: 'Confirmar',
      message: `¿Deseas guardar los cambios?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async () => {
            try {
              // CAMBIO: Si tiene ID > 0 es Editar (PUT), si no es Crear (POST)
              if (this.nuevaNoticia.id && this.nuevaNoticia.id !== 0) {
                await this.noticiaService.updateNoticia(this.nuevaNoticia);
              } else {
                await this.noticiaService.addNoticia(this.nuevaNoticia);
              }

              // Reseteamos
              this.nuevaNoticia = {
                id: 0,
                titulo: '',
                descripcion: '',
                imagen: '',
                esUrgente: false,
                categoria: '',
                fecha: new Date()
              };

              await this.cargarNoticias();
              this.cerrarModal();

              const toast = await this.toastController.create({
                message: 'Operación realizada correctamente',
                duration: 2500,
                color: 'success',
              });
              await toast.present();

            } catch (error) {
              console.error('Error al guardar:', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async borrarNoticia(id: number) {
    try {
      await this.noticiaService.deleteNoticia(id);
      await this.cargarNoticias();
    } catch (error) {
      console.error('Error al borrar:', error);
    }
  }

}