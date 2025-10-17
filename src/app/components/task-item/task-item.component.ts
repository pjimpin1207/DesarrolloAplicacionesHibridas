import { Component, Input } from '@angular/core';
import { Tarea } from '../../interfaces/tarea';
// 1. Importamos los componentes de Ionic que usaremos en el HTML
import { IonCard, IonItem, IonCheckbox, IonLabel, IonButton } from '@ionic/angular/standalone';
// 2. Importamos CommonModule para poder usar directivas como [class.tachado]
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  // 3. Registramos los módulos y componentes en el array 'imports'
  imports: [CommonModule, IonCard, IonItem, IonCheckbox, IonLabel, IonButton]
})
export class TaskItemComponent {

  @Input() tarea!: Tarea;

  constructor() { }

  mostrarDetalles() {
    console.log('Datos de la tarea:', this.tarea);
  }
}
    