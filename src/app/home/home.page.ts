// Imports básicos de Angular y Ionic
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

// Imports de nuestra aplicación
import { Noticia } from '../interfaces/noticia'; // Nuestra interfaz de noticias
import { NoticiaItemComponent } from '../components/noticia-item/noticia-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // Al ser un componente standalone, debemos importar aquí todo lo que usemos en la plantilla
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, // Componentes de Ionic
    NoticiaItemComponent, // Nuestro componente hijo
    CommonModule // El módulo para las directivas
  ],
})
export class HomePage {

  // Lista de noticias de ejemplo
  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Nuevo avance en inteligencia artificial',
      descripcion: 'Una nueva IA logra superar el test de Turing en múltiples idiomas.',
      imagen: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/artificial-intelligence-1958728_1280.jpg'
    },
    {
      id: 2,
      titulo: 'Descubren agua en un planeta similar a la Tierra',
      descripcion: 'Astrónomos anuncian el hallazgo de un exoplaneta con atmósfera rica en vapor de agua.',
      imagen: 'https://cdn.pixabay.com/photo/2016/11/21/15/59/planet-1849402_1280.jpg'
    },
    {
      id: 3,
      titulo: 'El coche eléctrico más barato del año',
      descripcion: 'Una startup presenta un vehículo eléctrico urbano por menos de 10.000 euros.',
      imagen: 'https://cdn.pixabay.com/photo/2016/02/19/11/53/car-1209919_1280.jpg'
    }
  ];

  constructor() {}
}
