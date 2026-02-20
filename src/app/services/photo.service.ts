import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  // Método para tomar foto en formato Base64 (ideal para guardar en Storage)
  public async tomarFoto(): Promise<string | undefined> {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90, 
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });

      // Devolvemos la imagen lista para ser leída por un <img src="...">
      return `data:image/jpeg;base64,${capturedPhoto.base64String}`;
      
    } catch (error) {
      console.log('El usuario canceló la foto o hubo un error', error);
      return undefined;
    }
  }
}