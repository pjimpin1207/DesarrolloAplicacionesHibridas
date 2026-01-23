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
  
  async getNoticias(): Promise<Noticia[]> {
    return firstValueFrom(this.http.get<Noticia[]>(this.apiUrl));
  }

  async getNoticiaPorId(id: number): Promise<Noticia> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.get<Noticia>(url));
  }

  async addNoticia(noticia: Noticia): Promise<Noticia> {
    noticia.fecha = new Date();
    const { id, ...noticiaSinId } = noticia;
    return firstValueFrom(this.http.post<Noticia>(this.apiUrl, noticiaSinId));
  }

  // Actualizar noticia existente con PUT
  async updateNoticia(noticia: Noticia): Promise<Noticia> {
    const url = `${this.apiUrl}/${noticia.id}`;
    return firstValueFrom(
      this.http.put<Noticia>(url, noticia)
    );
  }

  // Eliminar noticias
  async deleteNoticia(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(
      this.http.delete<void>(url)
    );
  }
}