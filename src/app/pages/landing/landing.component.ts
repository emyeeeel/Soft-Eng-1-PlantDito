import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton],
  standalone: true,
})
export class LandingComponent implements OnInit {
  showPopup = false;            // Controls the visibility of the popup
  popupTitle = '';              // Title for the popup
  popupText = '';               // Text for the popup
  buttonText = 'Next';          // Text for the button in the popup
  currentStep = 0;              // Current step of the popup
  hasVisited = false;           // Track if the user has visited
  showSwipeText = true;         // Control visibility of the "Swipe to continue" text

  constructor(private router: Router) {}

  ngOnInit() {
    // Reset the state on initial load or navigation back to landing
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && this.router.url === '/landing')
    ).subscribe(() => {
      this.resetPopup();
    });
  }

  togglePopup() {
    this.showPopup = true;       // Show the popup when toggled
    this.showSwipeText = false;  // Hide the swipe text after clicking
    this.updatePopupContent();
  }

  updatePopupContent() {
    const popupVersions = this.popupVersions;
    this.popupTitle = popupVersions[this.currentStep].title;
    this.popupText = popupVersions[this.currentStep].text;
    this.buttonText = this.currentStep === popupVersions.length - 1 ? 'Get Started' : 'Next';
  }

  handleButtonClick() {
    const popupVersions = this.popupVersions;

    if (this.buttonText === 'Next' && this.currentStep < popupVersions.length - 1) {
      this.currentStep++;
      this.updatePopupContent();
    } else {
      this.router.navigate(['/signup']);
    }
  }

  get popupVersions() {
    return [
      { title: 'Planting Made Easy!', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
      { title: 'Growing Stronger!', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { title: 'Harvesting Success', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    ];
  }

  // Reset the popup to the initial state
  resetPopup() {
    this.showPopup = false;     // Hide popup initially
    this.currentStep = 0;       // Reset current step
    this.showSwipeText = true;  // Show swipe text on reset
  }
}
