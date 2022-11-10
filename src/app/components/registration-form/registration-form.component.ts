import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { RegistrationUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  constructor(private fb: FormBuilder) {}

  @Output() addUser = new EventEmitter<RegistrationUser>();

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group(
      {
        password: ['', Validators.required],
        rePassword: ['', Validators.required],
      },
      { validator: this.passwordConfirming }
    ),
  });

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password')?.value !== c.get('rePassword')?.value) {
      return { invalid: true };
    }
    return { invalid: false };
  }

  onSubmit() {
    const newUser: RegistrationUser = {
      firstName: this.registrationForm.value.firstName as string,
      lastName: this.registrationForm.value.lastName as string,
      email: this.registrationForm.value.email as string,
      password: this.registrationForm.value.passwords.password as string,
    };
    this.addUser.emit(newUser);
  }
}
