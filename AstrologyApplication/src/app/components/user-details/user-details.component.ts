import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  
  currentStep: number = 1;
  submitted: boolean = false;
  constructor(private route:Router){}
  selectOption(option: string) {
    this.formData.gender = option; // Store selected option if needed
    this.currentStep = 2; // Move to the next step
  }

  formData = {
    selectedDate: '',
    selectedTime: '',
    gender:'',
    firstName: '',
    lastName: '',
    email:''
  };

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    } else {
      this.submit();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onDateChange(event: any) {
    this.formData.selectedDate = event.target.value;
  }

  onTimeChange(event: any) {
    this.formData.selectedTime = event.target.value;
  }


  submit() {
    this.submitted = true;
    // Handle the final form submission (e.g., send data to server)
    console.log('Form data:', this.formData);
  }
  resetForm() {
    this.currentStep = 1;
    this.submitted = false;
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      selectedDate: '',
      selectedTime: '',
      gender: ''
    };
  }
}
