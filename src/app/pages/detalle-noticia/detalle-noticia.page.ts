import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interfaces/noticia';

// Importamos los iconos necesarios
import { addIcons } from 'ionicons';
import { calendarOutline, alertCircleOutline } from 'ionicons/icons';

// Importamos componentes Standalone de Ionic
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
  IonSkeletonText,
  IonIcon 
} from '@ionic/angular/standalone';

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
    IonBadge,
    IonButton,
    IonSkeletonText,
    IonIcon
  ],
})
export class DetalleNoticiaPage implements OnInit {

  noticia: Noticia | null = null;
  errorCarga: boolean = false; // Variable para controlar si mostramos el error en HTML

  constructor(
    private activatedRoute: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {
    // Registramos los iconos que usamos en el HTML
    addIcons({ calendarOutline, alertCircleOutline });
  }

  async ngOnInit() {
    // Obtener el ID de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      try {
        // Pedir la noticia al servicio
        this.noticia = await this.noticiaService.getNoticiaPorId(id);
        
        // Si carga bien, errorCarga se queda en false
        this.errorCarga = false;

      } catch (error) {
        console.error('Error al cargar la noticia:', error);
        // Si falla, activamos la variable para mostrar el diseño de "No encontrada"
        this.errorCarga = true;
      }
    } else {
      // Si no hay ID en la URL, también es un error
      this.errorCarga = true;
    }
  }
}