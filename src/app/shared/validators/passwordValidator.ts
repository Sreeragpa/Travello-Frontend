import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  if (!control || !control.parent) {
    return null; // Avoid errors when form isn't fully initialized
  }

  const password = control.parent.get('password');
  const confirmPassword = control;

  if (!password || !confirmPassword) {
    return null; // Handle missing controls
  }

  if (confirmPassword.value !== password.value) {
    return { passwordsDontMatch: true }; // Error key for the confirm password field
  }

  return null; // Passwords match, no error
}