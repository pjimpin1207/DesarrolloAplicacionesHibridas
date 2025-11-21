import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController, AnimationController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaItemComponent } from '../components/noticia-item/noticia-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { Noticia } from '../interfaces/noticia';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NoticiaItemComponent,
    HeaderComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Mbappé marca un doblete y lleva al Real Madrid a la victoria',
      descripcion: 'El delantero francés fue la figura del partido ante el Barcelona, consolidando el liderato del Real Madrid en LaLiga.',
      imagen: 'https://www.reuters.com/resizer/v2/UEZBDF5MXZJLVMRBSWFJZ6ZCBI.jpg?auth=9a6a5c1942e632b46601abc56feb49d43cba25818bf30db3f62fa2b611681ce9&width=4406&quality=80',
      esUrgente: true,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-23')
    },
    {
      id: 2,
      titulo: 'Los Lakers debutan con victoria gracias a LeBron y Davis',
      descripcion: 'Los Ángeles Lakers iniciaron la temporada con un triunfo sólido ante los Warriors, con una actuación estelar de LeBron James.',
      imagen: 'https://ca-times.brightspotcdn.com/dims4/default/9934d0d/2147483647/strip/true/crop/3841x2160+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F77%2F09%2Fe3d839a74d369852e72b689228c1%2Flakers-basketball-85820.jpg',
      esUrgente: false,
      categoria: 'Baloncesto',
      fecha: new Date('2025-10-22')
    },
    {
      id: 3,
      titulo: 'El Manchester City avanza invicto en la Champions League',
      descripcion: 'El conjunto de Pep Guardiola mantiene un paso perfecto en la fase de grupos tras vencer 0-2 al Villarreal.',
      imagen: 'https://imagenes.elpais.com/resizer/v2/IBNWICMLIBMTFJ6KVBCFXJZCVA.jpg?auth=7880e18e35082dbe7f65992729589500483e0830cc42dcf9a4b8c6a4bec1495a&width=1200',
      esUrgente: false,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-21')
    },
    {
      id: 4,
      titulo: 'Stephen Curry logra 45 puntos en un partido histórico',
      descripcion: 'El base de los Golden State Warriors volvió a brillar con una actuación espectacular frente a los Celtics.',
      imagen: 'https://e0.365dm.com/22/11/768x432/skysports-nba-curry-warriors_5951618.jpg',
      esUrgente: true,
      categoria: 'Baloncesto',
      fecha: new Date('2025-10-20')
    }
  ];

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
    private toastController: ToastController,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    // Simular la carga de datos
    setTimeout(() => (this.loading = false), 1000);
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

  abrirModal() {
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
      header: 'Confirmar publicación',
      message: `¿Deseas publicar la noticia "<strong>${this.nuevaNoticia.titulo}</strong>"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Publicar',
          handler: async () => {
            const nueva = {
              ...this.nuevaNoticia,
              id: Date.now(),
              fecha: new Date()
            };
            this.noticias.unshift(nueva);
            this.nuevaNoticia = {
              id: 0,
              titulo: '',
              descripcion: '',
              imagen: '',
              esUrgente: false,
              categoria: '',
              fecha: new Date()
            };

            const toast = await this.toastController.create({
              message: 'Noticia publicada correctamente ✅',
              duration: 2500,
              color: 'success',
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }
}
