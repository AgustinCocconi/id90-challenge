import { createAction, props } from '@ngrx/store';
import { LoginCredentials } from 'src/app/shared/interfaces/login-credentials.interface';
export const USER_LOGIN = '[Login Page] Login';
export const USER_LOGIN_SUCCESS = '[Login Page] Login Success';
export const USER_LOGIN_FAILURE = '[Login Page] Login Failure';
export const GET_AIRLINES = '[Login Page] Get Airlines';
export const GET_AIRLINES_SUCCESS = '[Login Page] Get Airlines Success';
export const GET_AIRLINES_FAILURE = '[Login Page] Get Airlines Failure';

export const login = createAction(
    USER_LOGIN,
    props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
    USER_LOGIN_SUCCESS,
    props<any>()
)

export const loginFailure = createAction(
    USER_LOGIN_FAILURE,
    props<{ message: string }>()
)

export const getAirlines = createAction(
    GET_AIRLINES
);

export const getAirlinesSuccess = createAction(
    GET_AIRLINES_SUCCESS,
    props<any>()
)

export const getAirlinesFailure = createAction(
    GET_AIRLINES_FAILURE,
    props<{ error: any }>()
)