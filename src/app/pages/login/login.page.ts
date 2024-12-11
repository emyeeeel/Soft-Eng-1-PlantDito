import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { getAuth, signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const auth = getAuth();  // Correct way to get auth instance from Firebase

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email!, password!); // Use non-null assertion for undefined values
        console.log('User logged in:', userCredential.user);
        // Navigate to the dashboard or home page
        this.router.navigate(['/home']);
      } catch (error: any) {  // Use `any` type for the error to avoid unknown type
        console.error('Error during login:', error.message);
        alert('Login failed: ' + error.message);
      }
    }
  }
}
