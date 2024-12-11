import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonNote } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Initialize first signup form with validation
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    // Initialize second signup form with validation
    this.secondSignupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    });

    // Add password match validation after form initialization
    this.secondSignupForm.get('repeatPassword')?.valueChanges.subscribe(() => {
      this.validatePasswords();
    });

    this.secondSignupForm.get('password')?.valueChanges.subscribe(() => {
      this.validatePasswords();
    });
  }

  private validatePasswords() {
    const password = this.secondSignupForm.get('password');
    const repeatPassword = this.secondSignupForm.get('repeatPassword');

    if (password && repeatPassword && repeatPassword.value) {
      if (password.value !== repeatPassword.value) {
        repeatPassword.setErrors({ passwordMismatch: true });
      } else {
        repeatPassword.setErrors(null);
      }
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  showSignupPopup() {
    this.showPopup = true;
  }

  continueSignup() {
    if (this.signupForm.valid) {
      this.showPopup = false;
      this.showSecondPopup = true;
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  backToMain() {
    this.showPopup = false;
    this.showSecondPopup = false;
  }

  backToFirstPopup() {
    this.showSecondPopup = false;
    this.showPopup = true;
  }

  completeSignup() {
    if (this.secondSignupForm.valid) {
      const { email, password } = this.secondSignupForm.value;

      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User signed up:', userCredential.user);
          const userData = {
            ...this.signupForm.value,
            email
          };
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Signup error:', error);
          // Handle specific error cases here
        });
    } else {
      Object.keys(this.secondSignupForm.controls).forEach(key => {
        const control = this.secondSignupForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
