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

  // 🔹 Inyectamos HttpClient
  constructor(private http: HttpClient) {}

  /**
   * =====================================
   * GET → Obtener TODAS las noticias
   * =====================================
   */
  async getNoticias(): Promise<Noticia[]> {
    return firstValueFrom(
      this.http.get<Noticia[]>(this.apiUrl)
    );
  }

  /**
   * =====================================
   * GET → Obtener noticia por ID
   * =====================================
   */
  async getNoticiaPorId(id: number): Promise<Noticia> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(
      this.http.get<Noticia>(url)
    );
  }

  /**
   * =====================================
   * POST → Añadir noticia nueva
   * =====================================
   */
  // Cambiamos el tipo a 'any' como sugiere el tutorial para poder desestructurar fácilmente
  async addNoticia(noticia: any): Promise<Noticia> {
    
    // Aseguramos que tenga fecha actual antes de enviar
    noticia.fecha = new Date();

    // 👉 1. Eliminamos el ID temporal (0) antes de enviar.
    // Creamos una copia del objeto sin el campo 'id'.
    const { id, ...noticiaSinId } = noticia;

    // 👉 2. Hacemos la petición POST enviando el objeto limpio
    // JSON Server se encargará de asignarle un ID nuevo y único.
    return firstValueFrom(
      this.http.post<Noticia>(this.apiUrl, noticiaSinId)
    );
  }

  /**
   * =====================================
   * DELETE → Eliminar noticia
   * =====================================
   */
  async deleteNoticia(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    await firstValueFrom(
      this.http.delete<void>(url)
    );
  }
}