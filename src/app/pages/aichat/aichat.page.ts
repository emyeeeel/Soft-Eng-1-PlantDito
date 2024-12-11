import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-aichat',
  standalone: true,
  templateUrl: './aichat.page.html',
  styleUrls: ['./aichat.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonItem]
})
export class AichatPage  {
  constructor() {}
}
