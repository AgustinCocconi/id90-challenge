import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AirlinesService } from 'src/app/login/data-access/services/airlines.service';
import { SessionService } from '../../login/data-access/services/session.service';
import * as authActions from '../actions/auth.actions';
import * as storage from '../state/storage';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private sessionService: SessionService,
        private airlinesService: AirlinesService,
    ) { }

    // users
    userLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.login),
            exhaustMap(action => {
                if (action.credentials?.remember_me) {
                    storage.setItem('credentials', JSON.stringify(action.credentials));
                } else {
                    storage.removeItem('credentials');
                }
                return this.sessionService.login(action.credentials).pipe(
                    map(response => authActions.loginSuccess(response)),
                    catchError((error: any) => of(authActions.loginFailure(error))));
            }
            )
        )
    );

    // airlines
    getAirlines$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.getAirlines),
            exhaustMap(action =>
                this.airlinesService.getAirlines().pipe(
                    map(response => authActions.getAirlinesSuccess(response)),
                    catchError((error: any) => of(authActions.getAirlinesFailure(error))))
            ),
        )
    );
}
