import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Airline } from 'src/app/shared/interfaces/airline.interface';
import { LoginFormData } from 'src/app/shared/interfaces/login-form-data.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() loginForm!: FormGroup;
  @Input() airlines!: Airline[];
  @Input() loading!: boolean;
  @Output() submit = new EventEmitter<LoginFormData>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submit.emit(this.loginForm.value);
    }
  }

  changeRememberMe(event: Event) {
    const target = event.target as HTMLInputElement;
    this.loginForm.get('remember_me')?.setValue(target.checked);
  }
}
