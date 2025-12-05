import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interfaces/noticia';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonImg,
  IonBadge  // ← FALTABA ESTO
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
  IonImg,
  IonBadge   // ← NECESARIO PARA QUE <ion-badge> FUNCIONE
]
})
export class DetalleNoticiaPage implements OnInit {

  noticia: Noticia | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.noticia = this.noticiaService.getNoticiaPorId(Number(id));
    }
  }
}
