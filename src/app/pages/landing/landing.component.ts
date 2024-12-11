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
  showPopup = false;
  popupTitle = '';
  popupText = '';
  buttonText = 'Next';
  currentStep = 0;
  hasVisited = false;
  showSwipeText = true;
  isHeadingVisible = true;
  backgroundImage: string = 'first';


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
    this.showPopup = true;
    this.showSwipeText = false;
    this.updatePopupContent();
    this.isHeadingVisible = !this.showPopup;
    this.backgroundImage =
      this.backgroundImage === 'first' ? 'second' :
      'first'; // This will cycle back to the first image
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
      this.backgroundImage =
      this.backgroundImage === 'second' ? 'third' :
      this.backgroundImage === 'third' ? 'fourth' :
      'first'; // This will cycle back to the first image
      this.updatePopupContent();
    } else {
      this.router.navigate(['/signup']);
    }
  }

  get popupVersions() {
    return [
      { title: 'Planting Made Easy!', text: 'Start your farming journey with easy-to-follow planting guides and crop recommendations tailored to your location.' },
      { title: 'Growing Stronger!', text: 'Optimize your crops’ growth with personalized insights on soil, water, and climate conditions.' },
      { title: 'Harvesting Success', text: 'Maximize your yield with our harvest tools, ensuring your crops are ready for the best possible harvest.' },
    ];
  }

  // Reset the popup to the initial state
  resetPopup() {
    this.showPopup = false;
    this.currentStep = 0;
    this.showSwipeText = true;
  }
}
