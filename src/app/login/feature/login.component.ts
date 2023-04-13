import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, map, take, takeUntil } from 'rxjs/operators';
import { LoginFormData } from 'src/app/shared/interfaces/login-form-data.interface';
import * as fromRoot from '../../app-state';
import * as authActions from '../../app-state/actions/auth.actions';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Airline } from 'src/app/shared/interfaces/airline.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { password_pattern } from 'src/app/shared/utils/patterns';

const workingAirline = {
  "id": 238,
  "name": "hawaiian airlines (ha)",
  "code": "ha",
  "sign_in_available": true,
  "sign_up_available": true,
  "display_name": "HAWAIIAN AIRLINES (HA)",
  "is_commercial": true,
  "employee_number_required": true,
  "partner": true,
  "lang": "en",
  "currency": "$",
  "email_domains": [
    "hawaiianair.com"
  ],
  "airline_blog_uri": "https://www.id90travel.com/about/how-to-non-rev/hawaiian-airlines",
  "white_label_url": "",
  "allowed_origins": [],
  "contact_email": null,
  "contact_phone": null
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  airlines$: Observable<Airline[] | null>;

  constructor(
    private router: Router,
    private readonly store: Store,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      airline: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(password_pattern)]],
      remember_me: [false],
    });
    this.airlines$ = combineLatest([this.store.select(fromRoot.getAirlines), this.store.select(fromRoot.userLogin)]).pipe(
      takeUntil(this.destroy$),
      delay(1000), //just so we can see the cute plane
      map(([airlinesData, formData]) => {
        if (formData.credentials && airlinesData.airlines?.length && !this.loginForm.get('airline')?.value) {

          const credentials: LoginFormData = {
            airline: airlinesData.airlines.find(el => el.display_name === formData?.credentials?.airline) || null,
            username: formData?.credentials?.username,
            password: formData?.credentials?.password,
            remember_me: formData.credentials.remember_me
          }

          this.loginForm.patchValue(credentials)
        }

        return airlinesData.airlines;
      }))

    this.store.dispatch(authActions.getAirlines());
  }

  ngOnInit(): void {
  }

  login(loginForm: LoginFormData) {
    if (!loginForm?.username) {
      return
    }
    // this.store.dispatch(authActions.login({ credentials: { username: loginForm.username, password: loginForm.password, airline: loginForm.airline?.display_name, remember_me: loginForm.remember_me } }));
    this.store.dispatch(authActions.login({ credentials: { username: loginForm.username, password: loginForm.password, airline: workingAirline.display_name, remember_me: loginForm.remember_me } })); //only ariline available for login
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
