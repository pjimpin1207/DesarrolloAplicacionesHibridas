import { Injectable } from '@angular/core';
import { Noticia } from '../interfaces/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private listaNoticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Mbappé marca un doblete y lleva al Real Madrid a la victoria',
      descripcion: 'El delantero francés lideró el triunfo en el Clásico, consolidando el liderato del Real Madrid.',
      imagen: 'https://www.reuters.com/resizer/v2/UEZBDF5MXZJLVMRBSWFJZ6ZCBI.jpg?auth=9a6a5c1942e632b46601abc56feb49d43cba25818bf30db3f62fa2b611681ce9&width=4406&quality=80',
      esUrgente: true,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-23')
    },
    {
      id: 2,
      titulo: 'Invasión BLANCA en el "Spotify Camp Nou" ',
      descripcion: 'El Memelona ha abierto una investigación interna para saber cómo fue posible que 30.000 aficionados del Eintracht de Frankfurt le invadieron su propio estadio.',
      imagen: 'https://www.prensalibre.com/wp-content/uploads/2022/04/los-aficionados-del-eintracht-toman-el-capm-nou.jpg?quality=52',
      esUrgente: false,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-22')
    },
    {
      id: 3,
      titulo: 'Claudia Pina hace historia',
      descripcion: 'Con tan solo 233 partidos jugados con su club lleva marcado un total de 458 goles. La apodan el terror del FC.',
      imagen: 'https://imagenes.elpais.com/resizer/v2/PGXVI7FGCJCY3MMRTUK3SIJGF4.jpg?auth=977a2c4297cf8200c6ddbd664fd11b85860a46f98b8d9f49296c8f9b8239b1c4&width=980&height=980&smart=true',
      esUrgente: false,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-21')
    },
    {
      id: 4,
      titulo: 'El Manchester City avanza invicto en la Champions League',
      descripcion: 'El conjunto de Pep Guardiola mantiene un paso perfecto en la fase de grupos tras vencer 0-2 al Villarreal.',
      imagen: 'https://imagenes.elpais.com/resizer/v2/IBNWICMLIBMTFJ6KVBCFXJZCVA.jpg?auth=7880e18e35082dbe7f65992729589500483e0830cc42dcf9a4b8c6a4bec1495a&width=1200',
      esUrgente: false,
      categoria: 'Fútbol',
      fecha: new Date('2025-10-21')
    },

    {
      id: 5,
      titulo: 'Stephen Curry logra 45 puntos en un partido histórico',
      descripcion: 'El base de los Golden State Warriors volvió a brillar con una actuación espectacular frente a los Celtics.',
      imagen: 'https://e0.365dm.com/22/11/768x432/skysports-nba-curry-warriors_5951618.jpg',
      esUrgente: true,
      categoria: 'Baloncesto',
      fecha: new Date('2025-10-20')
    },
    {
      id: 6,
      titulo: 'Los Lakers debutan con victoria gracias a LeBron y Davis',
      descripcion: 'LeBron James firmó un partido espectacular para sellar el triunfo ante los Warriors.',
      imagen: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/28C4/production/_128563401_gettyimages-1463993781.jpg.webp',
      esUrgente: false,
      categoria: 'Baloncesto',
      fecha: new Date('2025-10-22')
    },
  ];

  constructor() {}

  // Obtener todas las noticias
  getNoticias(): Noticia[] {
    return this.listaNoticias;
  }

  // Añadir una noticia
  addNoticia(noticia: Noticia) {
    noticia.id = Date.now();
    noticia.fecha = new Date();
    this.listaNoticias.unshift(noticia);
  }

  // Eliminar noticia
  deleteNoticia(id: number) {
    this.listaNoticias = this.listaNoticias.filter(n => n.id !== id);
  }

  // Obtener noticia por ID
  getNoticiaById(id: number): Noticia | undefined {
    return this.listaNoticias.find(n => n.id == id);
  }
}