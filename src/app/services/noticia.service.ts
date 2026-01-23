import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Noticia } from '../interfaces/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  // 🔹 URL base de JSON Server
  private apiUrl = 'http://localhost:3000/noticias';

  constructor(private http: HttpClient) {}
  
  async getNoticias(): Promise<Noticia[]> {
    return firstValueFrom(this.http.get<Noticia[]>(this.apiUrl));
  }

  async getNoticiaPorId(id: number): Promise<Noticia> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.get<Noticia>(url));
  }

  async addNoticia(noticia: any): Promise<Noticia> {
    noticia.fecha = new Date();
    const { id, ...noticiaSinId } = noticia;
    return firstValueFrom(this.http.post<Noticia>(this.apiUrl, noticiaSinId));
  }


  //Actualizar noticia existente con PUT
  async updateNoticia(noticia: Noticia): Promise<Noticia> {
    // Construimos la URL específica con el ID de la noticia
    const url = `${this.apiUrl}/${noticia.id}`;

    // Hacemos la petición PUT enviando el objeto modificado
    return firstValueFrom(
      this.http.put<Noticia>(url, noticia)
    );
  }

  /**
   * =====================================
   * DELETE → Eliminar noticia
   * =====================================
   */
  async deleteNoticia(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    
    // Hacemos la petición DELETE.
    // firstValueFrom convierte el Observable en Promesa.
    return firstValueFrom(
      this.http.delete<void>(url)
    );
  }
}