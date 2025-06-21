import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { ThankYouModalComponent } from '../thank-you-modal/thank-you-modal.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  registrationForm: FormGroup;
  currentYear: number;

  constructor(
    private fb: FormBuilder, // FormBuilder makes form creation cleaner
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.currentYear = new Date().getFullYear();
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      gender: ['', Validators.required], // Using ion-select
      // Using ion-datetime
      dob: ['', Validators.required],
      // Using ion-toggle
      receiveNotifications: [false],
      // Using ion-checkbox
      agreeTerms: [false, Validators.requiredTrue], // Must be true
      // Using ion-range
      satisfactionRating: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      // Using ion-textarea
      comments: [''],
    });
  }

    // Getter for easy access to form controls in the template
  get f() {
    return this.registrationForm.controls;
  }

  async onSubmit() {
    // Mark all fields as touched to display errors immediately on submission attempt
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);

      // Present the thank you modal
      const modal = await this.modalController.create({
        component: ThankYouModalComponent,
        componentProps: {
          name: this.registrationForm.get('fullName')?.value // Pass the name to the modal
        },
        initialBreakpoint: 0.5, // Make it a bottom sheet modal
        breakpoints: [0, 0.5, 0.8],
      });
      await modal.present();

      modal.onDidDismiss().then(() => {
        // Reset the form after modal is dismissed
        this.registrationForm.reset({
          fullName: '',
          email: '',
          age: '',
          gender: '',
          dob: '',
          receiveNotifications: false,
          agreeTerms: false,
          satisfactionRating: 50,
          comments: ''
        });
      });

    } else {
      console.log('Form is invalid. Please check fields.');
      const toast = await this.toastController.create({
        message: 'Please review and correct the errors in the form.',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
      toast.present();
    }
  }

  // Helper function to check if a control has a specific error
  hasError(controlName: string, errorType: string) {
    const control = this.f[controlName];
    return control.errors?.[errorType] && (control.dirty || control.touched);
  }
}