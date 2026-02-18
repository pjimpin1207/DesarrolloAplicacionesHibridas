import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule, ToastController, AlertController, AnimationController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';
import { NoticiaService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { addIcons } from 'ionicons';
import { trash, add, create, alertCircleOutline, filter } from 'ionicons/icons';

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

  // Variables para los filtros
  busquedaActual: string = '';
  ordenActual: string = 'desc'; // Por defecto: más recientes

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
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private router: Router,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ trash, add, create, alertCircleOutline, filter });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.nombreUsuario = await this.settingsService.getUserName();
    await this.cargarNoticias();
    this.cdr.detectChanges();
  }

  // Metodo para mostrar los errores
  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger',
      icon: 'alert-circle-outline',
      position: 'bottom'
    });
    await toast.present();
  }

  // Cargar noticias con filtro y orden
  async cargarNoticias() {
    
    // Mostrar cuadrado de carga
    const loading = await this.loadingController.create({
      message: 'Cargando noticias...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Pasamos la búsqueda y el orden al servicio (MockAPI)
      this.noticias = await this.noticiaService.getNoticias(
        this.busquedaActual, 
        this.ordenActual
      );
      
      // La API ya devuelve los datos ordenados, no hace falta .reverse()
      
      this.loading = false;
      
    } catch (error) {
      console.error('Error al cargar:', error);
      this.mostrarError('No se pudieron cargar las noticias.');
      
    } finally {
      await loading.dismiss();
      this.cdr.detectChanges();
    }
  }
  
  // Se ejecuta al escribir en el buscador
  manejarBusqueda(event: any) {
    this.busquedaActual = event.detail.value;
    this.cargarNoticias(); // Recargamos con el filtro
  }

  // Se ejecuta al cambiar el select de orden
  manejarOrden(event: any) {
    this.ordenActual = event.detail.value;
    this.cargarNoticias(); // Recargamos con el nuevo orden
  }

  // Navegación manual para evitar conflictos con los botones
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
    this.nuevaNoticia = {
      id: 0, titulo: '', descripcion: '', imagen: '',
      esUrgente: false, categoria: '', fecha: new Date()
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

  // Metodo para guardar y editar las noticias
  async agregarNoticia() {
    if (!this.nuevaNoticia.titulo.trim() || !this.nuevaNoticia.descripcion.trim()) {
      this.mostrarError('Por favor, completa los campos obligatorios.');
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

              this.nuevaNoticia = {
                id: 0, titulo: '', descripcion: '', imagen: '',
                esUrgente: false, categoria: '', fecha: new Date()
              };

              await loading.dismiss(); 
              this.cerrarModal();

              await this.cargarNoticias(); // Se recarga respetando filtros

              const toast = await this.toastController.create({
                message: 'Operación realizada correctamente',
                duration: 2000,
                color: 'success',
              });
              await toast.present();

            } catch (error) {
              await loading.dismiss();
              console.error('Error al guardar:', error);
              this.mostrarError('Error al guardar la noticia. Inténtalo de nuevo.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Borrar noticia
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

              const toast = await this.toastController.create({
                message: 'Noticia eliminada correctamente',
                duration: 2000,
                color: 'success'
              });
              await toast.present();

            } catch (error) {
              await loading.dismiss();
              console.error('Error al borrar:', error);
              this.mostrarError('No se pudo eliminar la noticia.');
            }
          }
        }
      ]
    });
    await alert.present();
  }
}