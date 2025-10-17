import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NoticiaItemComponent } from '../components/noticia-item/noticia-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NoticiaItemComponent,
    HeaderComponent // Importamos el componente de cabecera
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Nuevo avance en inteligencia artificial',
      descripcion: 'Una nueva IA logra superar el test de Turing en múltiples idiomas.',
      imagen: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/artificial-intelligence-1958728_1280.jpg',
      esUrgente: true,
      fecha: new Date('2025-10-17')
    },
    {
      id: 2,
      titulo: 'Descubren agua en un planeta similar a la Tierra',
      descripcion: 'Astrónomos anuncian el hallazgo de un exoplaneta con atmósfera rica en vapor de agua.',
      imagen: 'https://cdn.pixabay.com/photo/2016/11/21/15/59/planet-1849402_1280.jpg',
      esUrgente: false,
      fecha: new Date('2025-10-16')
    },
    {
      id: 3,
      titulo: 'El coche eléctrico más barato del año',
      descripcion: 'Una startup presenta un vehículo eléctrico urbano por menos de 10.000 euros.',
      imagen: 'https://cdn.pixabay.com/photo/2016/02/19/11/53/car-1209919_1280.jpg',
      esUrgente: false,
      fecha: new Date('2025-10-15')
    }
  ];

  constructor() {}
}
