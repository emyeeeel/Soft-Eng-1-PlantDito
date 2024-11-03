import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonLabel,IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem } from '@ionic/angular/standalone';
import {  } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {

  showPopup = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  showSignupPopup() {
    this.showPopup = true;
  }

  hidePopup() {
    this.showPopup = false;
  }

  continueSignup() {
    if (this.signupForm.valid) {
      console.log('Signup form submitted:', this.signupForm.value);
      // Add logic to proceed with signup process
      this.hidePopup();
    }
  }
}
