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

  // 👉 CAMBIO 1: Aceptamos string o number (MockAPI usa strings)
  async getNoticiaPorId(id: number | string): Promise<Noticia> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.get<Noticia>(url));
  }

  // 👉 CAMBIO 2: Limpieza de datos para evitar Error 400
  async addNoticia(noticia: Noticia): Promise<Noticia> {
    
    // Creamos un objeto NUEVO y limpio para enviar al servidor
    // Convertimos la fecha a string ISO para evitar problemas de formato
    const datosParaEnviar = {
      titulo: noticia.titulo,
      descripcion: noticia.descripcion,
      imagen: noticia.imagen,
      categoria: noticia.categoria,
      esUrgente: noticia.esUrgente,
      fecha: new Date().toISOString() // Fecha como texto
      // ⚠️ IMPORTANTE: No incluimos el 'id', MockAPI lo genera solo
    };

    console.log('📡 Enviando POST a:', this.apiUrl);
    console.log('📦 Datos:', datosParaEnviar);

    return firstValueFrom(this.http.post<Noticia>(this.apiUrl, datosParaEnviar));
  }

  // Actualizar noticia existente con PUT
  async updateNoticia(noticia: Noticia): Promise<Noticia> {
    const url = `${this.apiUrl}/${noticia.id}`;
    return firstValueFrom(
      this.http.put<Noticia>(url, noticia)
    );
  }

  // 👉 CAMBIO 3: Aceptamos string o number en delete
  async deleteNoticia(id: number | string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(
      this.http.delete<void>(url)
    );
  }
}