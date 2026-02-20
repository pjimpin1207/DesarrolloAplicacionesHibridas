import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // Método que devuelve las coordenadas exactas
  async obtenerPosicionActual() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      
      return {
        latitud: coordinates.coords.latitude,
        longitud: coordinates.coords.longitude
      };
      
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      return null;
    }
  }
}