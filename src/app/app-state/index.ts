import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromAuth from './reducers/auth.reducer';


export interface State {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
};

const reducerKeys = ['auth'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: reducerKeys })(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = [debug, localStorageSyncReducer];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getLoggedInUser = createSelector(
    getAuthState,
    fromAuth.getLoggedInUser
);

export const userLogin = createSelector(
    getAuthState,
    fromAuth.userLogin
);

export const getAirlines = createSelector(
    getAuthState,
    fromAuth.getAirlines
);

