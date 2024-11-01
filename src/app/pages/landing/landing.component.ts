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
    this.showPopup = false;    
    this.currentStep = 0;      
    this.showSwipeText = true;  
  }
}
