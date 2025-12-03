import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Noticia } from 'src/app/interfaces/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';

import {
  IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonBadge, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
  standalone: true,
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
    IonButton
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
