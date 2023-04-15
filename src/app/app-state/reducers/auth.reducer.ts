import { Action, createReducer, on } from '@ngrx/store';
import { Airline } from 'src/app/shared/interfaces/airline.interface';
import { LoginCredentials } from 'src/app/shared/interfaces/login-credentials.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import * as authActions from '../actions/auth.actions';
import * as storage from '../state/storage';

export interface State {
    credentials: LoginCredentials | null;
    user: User | null;
    airlines: Airline[] | null;
    result: any;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isLoadingFailure: boolean;
    redirectUrl: string;
}

export const initialState: State = {
    credentials: storage.getItem<LoginCredentials>('credentials'),
    user: storage.getItem<User>('user'),
    airlines: null,
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    redirectUrl: ''
};

export const authReducer = createReducer(
    initialState,

    // users
    on(authActions.login, (state, { credentials }) => ({
        ...state,
        credentials,
        isLoading: true,
    })),
    on(authActions.loginSuccess, (state, { body }) => ({
        ...state,
        user: body.member,
        result: body,
        isLoading: false,
        isLoadingSuccess: true,
        redirectUrl: '/hotels',
    })),
    on(authActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: true,
    })),
    on(authActions.clearRedirectUrl, (state) => ({
        ...state,
        redirectUrl: '',
    })),

    // airlines
    on(authActions.getAirlines, (state) => ({
        ...state,
        isLoading: true,
        isLoadingSuccess: false,
        isLoadingFailure: false,
    })),
    on(authActions.getAirlinesSuccess, (state, { body }) => ({
        ...state,
        airlines: body,
        isLoading: false,
        isLoadingSuccess: true,
        isLoadingFailure: false,
    })),
    on(authActions.getAirlinesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: true,
        error,
    }))
);

export function reducer(state: State | undefined, action: Action): any {
    return authReducer(state, action);
}

// users
export const getLoggedInUser = (state: State) => ({
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess,
});

export const userLogin = (state: State) => ({
    user: state?.user,
    credentials: state?.credentials,
    result: state?.result,
    isLoading: state?.isLoading,
    isLoadingSuccess: state?.isLoadingSuccess,
    isLoadingFailure: state?.isLoadingFailure,
    redirectUrl: state?.redirectUrl,
});

// airlines
export const getAirlines = (state: State) => ({
    airlines: state?.airlines,
    isLoading: state?.isLoading,
    isLoadingSuccess: state?.isLoadingSuccess,
    isLoadingFailure: state?.isLoadingFailure,
});
