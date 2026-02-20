import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule, ToastController, AlertController, AnimationController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';
import { NoticiaService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

// 👇 Importamos tu servicio de GPS
import { LocationService } from '../services/location.service';

import { addIcons } from 'ionicons';
// 👇 Añadimos locationOutline
import { trash, add, create, alertCircleOutline, filter, locationOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  noticias: Noticia[] = [];
  nombreUsuario: string = '';

  busquedaActual: string = '';
  ordenActual: string = 'desc';

  nuevaNoticia: Noticia = {
    id: 0,
    titulo: '',
    descripcion: '',
    imagen: '',
    esUrgente: false,
    categoria: '',
    fecha: new Date(),
    // Inicializamos con undefined
    latitud: undefined, 
    longitud: undefined
  };

  loading = true;
  modalAbierto = false;
  
  // 👇 Estado para saber si el GPS está buscando (útil para desactivar el botón)
  buscandoGPS = false; 

  constructor(
    private noticiaService: NoticiaService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private router: Router,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef,
    // 👇 Inyectamos el servicio
    private locationService: LocationService 
  ) {
    // Registramos el icono del GPS
    addIcons({ trash, add, create, alertCircleOutline, filter, locationOutline });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.nombreUsuario = await this.settingsService.getUserName();
    await this.cargarNoticias();
    this.cdr.detectChanges();
  }

  // Método para mostrar mensajes (modificado para aceptar color)
  async mostrarMensaje(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      icon: color === 'danger' ? 'alert-circle-outline' : undefined,
      position: 'bottom'
    });
    await toast.present();
  }

  async cargarNoticias() {
    const loading = await this.loadingController.create({
      message: 'Cargando noticias...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      this.noticias = await this.noticiaService.getNoticias(this.busquedaActual, this.ordenActual);
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar:', error);
      this.mostrarMensaje('No se pudieron cargar las noticias.', 'danger');
    } finally {
      await loading.dismiss();
      this.cdr.detectChanges();
    }
  }
  
  manejarBusqueda(event: any) {
    this.busquedaActual = event.detail.value;
    this.cargarNoticias();
  }

  manejarOrden(event: any) {
    this.ordenActual = event.detail.value;
    this.cargarNoticias();
  }

  irAlDetalle(id: number | string) {
    this.router.navigate(['/detalle-noticia', id]);
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
    this.router.navigate(['/about']);
  }

  abrirModal() {
    // 👇 Asegúrate de resetear las coordenadas también al crear una nueva
    this.nuevaNoticia = {
      id: 0, titulo: '', descripcion: '', imagen: '',
      esUrgente: false, categoria: '', fecha: new Date(),
      latitud: undefined, longitud: undefined
    };
    this.modalAbierto = true;
  }

  prepararEdicion(noticia: Noticia) {
    this.nuevaNoticia = { ...noticia };
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  // 👇 NUEVO MÉTODO PARA EL BOTÓN DEL GPS
  async adjuntarUbicacion() {
    this.buscandoGPS = true; // Activa el estado de "buscando"
    
    try {
      const coords = await this.locationService.obtenerPosicionActual();
      
      if (coords) {
        this.nuevaNoticia.latitud = coords.latitud;
        this.nuevaNoticia.longitud = coords.longitud;
        this.mostrarMensaje('📍 Ubicación guardada con éxito', 'success');
      } else {
        this.mostrarMensaje('No se pudo obtener la ubicación. Revisa los permisos.', 'warning');
      }
    } catch (error) {
      this.mostrarMensaje('Error inesperado al buscar GPS', 'danger');
    } finally {
      this.buscandoGPS = false; // Desactiva el estado
      this.cdr.detectChanges(); // Fuerza la actualización del HTML
    }
  }

  async agregarNoticia() {
    if (!this.nuevaNoticia.titulo.trim() || !this.nuevaNoticia.descripcion.trim()) {
      this.mostrarMensaje('Por favor, completa los campos obligatorios.', 'danger');
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
            
            const loading = await this.loadingController.create({ 
              message: 'Guardando...' 
            });
            await loading.present();

            try {
              if (this.nuevaNoticia.id && this.nuevaNoticia.id !== 0) {
                await this.noticiaService.updateNoticia(this.nuevaNoticia);
              } else {
                await this.noticiaService.addNoticia(this.nuevaNoticia);
              }

              this.cerrarModal();
              await loading.dismiss(); 
              await this.cargarNoticias();

              this.mostrarMensaje('Operación realizada correctamente', 'success');

            } catch (error) {
              await loading.dismiss();
              console.error('Error al guardar:', error);
              this.mostrarMensaje('Error al guardar la noticia. Inténtalo de nuevo.', 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async borrarNoticia(id: number | string) {
    const alert = await this.alertController.create({
      header: 'Eliminar noticia',
      message: '¿Estás seguro? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            
            const loading = await this.loadingController.create({ 
              message: 'Eliminando...',
              spinner: 'circles'
            });
            await loading.present();

            try {
              await this.noticiaService.deleteNoticia(id);
              await loading.dismiss();
              await this.cargarNoticias();
              this.mostrarMensaje('Noticia eliminada correctamente', 'success');

            } catch (error) {
              await loading.dismiss();
              console.error('Error al borrar:', error);
              this.mostrarMensaje('No se pudo eliminar la noticia.', 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }
}