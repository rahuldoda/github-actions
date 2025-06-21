import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player';
import { IonicModule, ModalController } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-thank-you-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Thank You!</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center">
      <ion-icon name="checkmark-circle-outline" class="success-icon"></ion-icon>
      <h2>Your information has been successfully recorded.</h2>
      <p>We appreciate your time, {{ name }}!</p>
      <ion-button expand="block" fill="outline" (click)="dismissModal()">
        <ion-icon name="arrow-back" slot="start"></ion-icon>
        Go Back
      </ion-button>
    </ion-content>
  `,
  styles: [`
    .success-icon {
      font-size: 8em;
      color: var(--ion-color-success);
      margin-top: 20px;
      animation: bounceIn 0.8s ease-out;
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
      }
    }
  `],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, BrowserModule, AppRoutingModule],
})
export class ThankYouModalComponent {
  @Input() name: string = ''; // To display the user's name

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}