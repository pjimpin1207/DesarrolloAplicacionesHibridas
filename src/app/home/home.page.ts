// Imports básicos de Angular y Ionic
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

// Imports de nuestra aplicación
import { Tarea } from '../interfaces/tarea'; // Nuestra interfaz de datos
import { TaskItemComponent } from '../components/task-item/task-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // Al ser un componente standalone, debemos importar aquí todo lo que usemos en la plantilla
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, // Componentes de Ionic
    TaskItemComponent, // Nuestro componente hijo
    CommonModule // El módulo para las directivas
  ],
})
export class HomePage {

  // Esta es la lista de datos que mostraremos en la vista.
  // Es un array de objetos que deben cumplir la estructura de la interfaz 'Tarea'.
  listaDeTareas: Tarea[] = [
    { id: 1, titulo: "Comprar el pan", completada: true },
    { id: 2, titulo: "Estudiar componentes de Angular", completada: false },
    { id: 3, titulo: "Hacer el reto de la UT2", completada: false }
  ];

  constructor() {}
}