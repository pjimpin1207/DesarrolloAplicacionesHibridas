import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Noticia } from '../interfaces/noticia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  // URL base de la api
  private apiUrl = `${environment.apiUrl}/noticias`;

  constructor(private http: HttpClient) {}
  
  // Crear filtro
  async getNoticias(filtro: string = '', orden: string = 'desc'): Promise<Noticia[]> {
    let url = `${this.apiUrl}?sortBy=fecha&order=${orden}`;

    if (filtro) {
      url += `&search=${filtro}`;
    }

    return firstValueFrom(this.http.get<Noticia[]>(url));
  }

  async getNoticiaPorId(id: number | string): Promise<Noticia> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.get<Noticia>(url));
  }

  async addNoticia(noticia: Noticia): Promise<Noticia> {
    
    const datosParaEnviar = {
      titulo: noticia.titulo,
      descripcion: noticia.descripcion,
      imagen: noticia.imagen,
      categoria: noticia.categoria,
      esUrgente: noticia.esUrgente,
      fecha: new Date().toISOString()
    };

    console.log('📡 Enviando POST a:', this.apiUrl);
    console.log('📦 Datos:', datosParaEnviar);

    return firstValueFrom(this.http.post<Noticia>(this.apiUrl, datosParaEnviar));
  }

  async updateNoticia(noticia: Noticia): Promise<Noticia> {
    const url = `${this.apiUrl}/${noticia.id}`;
    return firstValueFrom(
      this.http.put<Noticia>(url, noticia)
    );
  }

  async deleteNoticia(id: number | string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(
      this.http.delete<void>(url)
    );
  }
}