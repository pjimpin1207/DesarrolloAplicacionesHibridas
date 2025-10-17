import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../interfaces/noticia';

@Component({
  selector: 'app-noticia-item',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './noticia-item.component.html',
  styleUrls: ['./noticia-item.component.scss'],
})
export class NoticiaItemComponent {
  @Input() noticia?: Noticia; // Manejo de datos opcionales
}
