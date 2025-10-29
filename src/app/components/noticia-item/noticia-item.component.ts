import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Noticia } from '../../interfaces/noticia';

@Component({
  selector: 'app-noticia-item',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  templateUrl: './noticia-item.component.html',
  styleUrls: ['./noticia-item.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoticiaItemComponent {
  @Input() noticia!: Noticia;
}
