import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AcceptButtonComponent } from 'src/app/shared/ui/accept-button/accept-button.component';
import { SharedErrorFooterComponent } from 'src/app/shared/ui/shared-error-footer/shared-error-footer.component';
import { SharedInputComponent } from 'src/app/shared/ui/shared-input/shared-input.component';
import { SharedSelectComponent } from 'src/app/shared/ui/shared-select/shared-select.component';
import { LoginFormComponent } from '../ui/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedInputComponent,
    SharedErrorFooterComponent,
    AcceptButtonComponent,
    SharedSelectComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
