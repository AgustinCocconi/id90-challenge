import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import * as storage from '../state/storage';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Airline } from 'src/app/shared/interfaces/airline.interface';
import { LoginCredentials } from 'src/app/shared/interfaces/login-credentials.interface';

export interface State {
    credentials: LoginCredentials | null
    user: User | null;
    airlines: Airline[] | null;
    result: any;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isLoadingFailure: boolean;
}

export const initialState: State = {
    credentials: storage.getItem<LoginCredentials>('credentials'),
    user: storage.getItem<User>('user'),
    airlines: null,
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false
};

const authReducer = createReducer(
    initialState,
    on(authActions.login, (state, { credentials }) => ({
        ...state,
        credentials,
        isLoading: true
    })),
    on(authActions.loginSuccess, (state, result) => (
        {
            ...state,
            user: result.body.member,
            result,
            isLoading: false,
            isLoadingSuccess: true
        })),
    on(authActions.loginFailure, (state, error) => (
        {
            ...state,
            error,
            isLoading: false,
            isLoadingSuccess: false,
            isLoadingFailure: true
        })),
    on(authActions.getAirlines, state => ({
        ...state,
        isLoading: true,
        isLoadingSuccess: false,
        isLoadingFailure: false
    })),
    on(authActions.getAirlinesSuccess, (state, result) => ({
        ...state,
        airlines: result.body,
        result,
        isLoading: false,
        isLoadingSuccess: true,
        isLoadingFailure: false
    })),
    on(authActions.getAirlinesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: true,
        error
    }))
);

export function reducer(state: State | undefined, action: Action): any {
    return authReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
    return {
        user: state.user,
        isLoadingSuccess: state.isLoadingSuccess
    }
};

export const getAirlines = (state: State) => {
    return {
        airlines: state?.airlines,
        isLoadingSuccess: state?.isLoadingSuccess
    }
};

export const userLogin = (state: State) => {
    return {
        user: state?.user,
        credentials: state?.credentials,
        result: state?.result,
        isLoading: state?.isLoading,
        isLoadingSuccess: state?.isLoadingSuccess
    }
};