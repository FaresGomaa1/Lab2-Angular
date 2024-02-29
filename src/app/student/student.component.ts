import { Component, ElementRef, ViewChild } from '@angular/core';
import { IStudent } from '../../Model/istudent';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  isNameValid = true;
  isAgeValid = true;
  isAddressValid = true;
  isPhoneNumberValid = true;
  studentData: IStudent = {
    name: '',
    age: null,
    address: '',
    phoneNumber: '',
  };
  studentArray: IStudent[] = [];
  constructor() {
  }
  validateName(inputName: string): void {
    this.isNameValid = inputName.length >= 4;
    this.studentData.name = inputName;
  }

  validateAge(ageInput: string): void {
    const age = parseInt(ageInput);
    this.isAgeValid = age >= 10 && age <= 17;
    this.studentData.age = age;
  }

  validateAddress(addressInput: string): void {
    this.isAddressValid =
      addressInput.includes('Giza') ||
      addressInput.includes('Alex') ||
      addressInput.includes('Cairo');
    this.studentData.address = addressInput;
  }

  validatePhoneNumber(phoneNumberInput: string): void {
    this.isPhoneNumberValid = /^(010|012|015)\d{8}$/.test(phoneNumberInput);
    this.studentData.phoneNumber = phoneNumberInput;
  }
  onSubmit(): void {
    // Check if all fields are filled and valid
    const allFieldsValid =
      this.isNameValid &&
      this.isAgeValid &&
      this.isAddressValid &&
      this.isPhoneNumberValid &&
      this.studentData.name.trim() !== '' &&
      !!this.studentData.age &&
      this.studentData.address.trim() !== '' &&
      /^(010|012|015)\d{8}$/.test(this.studentData.phoneNumber);

    if (allFieldsValid) {
      // Check if the data is not already present in the array
      const isDuplicate = this.studentArray.some(
        (student) =>
          student.name === this.studentData.name &&
          student.age === this.studentData.age &&
          student.address === this.studentData.address &&
          student.phoneNumber === this.studentData.phoneNumber
      );

      if (!isDuplicate) {
        this.studentArray.push(this.studentData);
        this.resetForm();
      } else {
        alert("Duplicate data detected. Not adding to the table.")
      }
    } else {
      // Update validation flags if any field is invalid or empty
      this.isNameValid = this.studentData.name.trim() !== '';
      this.isAgeValid = !!this.studentData.age;
      this.isAddressValid = this.studentData.address.trim() !== '';
      this.isPhoneNumberValid = /^(010|012|015)\d{8}$/.test(
        this.studentData.phoneNumber
      );
    }
  }
  resetForm(): void {
    // Reset form data
    this.studentData = {
      name: '',
      age: null,
      address: '',
      phoneNumber: '',
    };
    // Reset validation flags
    this.isNameValid = true;
    this.isAgeValid = true;
    this.isAddressValid = true;
    this.isPhoneNumberValid = true;
  }
  @ViewChild("studentID") studentId: ElementRef<HTMLInputElement> | undefined;

  deleteStudent() {
    let id: string = '';
    for (let i = 0; i < this.studentId!.nativeElement.id.length; i++) {
      // Check if the character is a digit
      if (!isNaN(parseInt(this.studentId!.nativeElement.id[i]))) {
        id += this.studentId!.nativeElement.id[i];
      }
    }
  
    const studentIndex: number = parseInt(id);
    if (studentIndex >= 0 && studentIndex < this.studentArray.length) {
      this.studentArray.splice(studentIndex, 1);
      if (this.studentId && this.studentId.nativeElement) {
        this.studentId.nativeElement.remove();
      }
    }
  }
  
  
  
  
}


