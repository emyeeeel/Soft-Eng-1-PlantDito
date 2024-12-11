import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  async logoutUser() {
    return await this.ngFireAuth.signOut();
  }
  async userDetails() {
    return this.ngFireAuth.currentUser;
  }
}
