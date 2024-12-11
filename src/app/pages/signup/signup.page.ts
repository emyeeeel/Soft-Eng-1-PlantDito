import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonLabel,IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonNote } from '@ionic/angular/standalone';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonNote, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  showPopup = false;      
  showSecondPopup = false; 
  signupForm!: FormGroup;  
  secondSignupForm!: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Initialize first signup form without validators
    this.signupForm = this.fb.group({
      firstName: [''], // No Validators
      lastName: [''],  // No Validators
    });

    // Initialize second signup form without validators
    this.secondSignupForm = this.fb.group({
      email: [''], 
      password: [''], 
      repeatPassword: ['']
    });
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }
  // Show the first signup popup when clicking 'Sign up for Free'
  showSignupPopup() {
    this.showPopup = true;
  }

  // Function to hide the first popup and show the second popup
  continueSignup() {
    this.showPopup = false;      
    this.showSecondPopup = true;
  }

  // Function to hide the first popup and navigate back to the main display
  backToMain() {
    this.showPopup = false; 
    this.showSecondPopup = false; // Ensure the second popup is also hidden
  }

  // Function to hide the second popup and show the first popup
  backToFirstPopup() {
    this.showSecondPopup = false; 
    this.showPopup = true; 
  }

  // Function to complete the signup process
  completeSignup() {
    console.log('Second Signup form submitted:', this.secondSignupForm.value);
    // Logic for completing the signup
    this.showSecondPopup = false;
  }

 
}
