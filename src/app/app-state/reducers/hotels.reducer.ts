import { Action, createReducer, on } from '@ngrx/store';
import { Hotel } from 'src/app/shared/interfaces/hotel.interface';
import * as hotelsActions from '../actions/hotels.actions';


export interface State {
    hotels: Hotel[];
    error: any;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isLoadingFailure: boolean;
}

export const initialState: State = {
    isLoading: false,
    hotels: [],
    error: null,
    isLoadingSuccess: false,
    isLoadingFailure: false,
};

const hotelsReducer = createReducer(
    initialState,
    on(hotelsActions.getHotels, state => ({
        ...state,
        isLoading: true
    })),
    on(hotelsActions.getHotelsSuccess, (state, { body }) => ({
        ...state,
        isLoading: false,
        hotels: body.hotels
    })),
    on(hotelsActions.getHotelsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);

export function reducer(state: State | undefined, action: Action): any {
    return hotelsReducer(state, action);
}

export const getHotels = (state: State) => ({
    hotels: state?.hotels,
    isLoading: state?.isLoading,
    isLoadingSuccess: state?.isLoadingSuccess,
    isLoadingFailure: state?.isLoadingFailure,
});
