import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromAuth from './reducers/auth.reducer';
import * as fromHotels from './reducers/hotels.reducer';

export interface State {
    auth: fromAuth.State;
    hotels: fromHotels.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    hotels: fromHotels.reducer
};

const reducerKeys = ['auth', 'hotels'];
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
export const getHotelsState = createFeatureSelector<fromHotels.State>('hotels');

// users
export const getLoggedInUser = createSelector(
    getAuthState,
    fromAuth.getLoggedInUser
);

export const userLogin = createSelector(
    getAuthState,
    fromAuth.userLogin
);

// airlines
export const getAirlines = createSelector(
    getAuthState,
    fromAuth.getAirlines
);


// hotels
export const getHotels = createSelector(
    getHotelsState,
    fromHotels.getHotels
);

