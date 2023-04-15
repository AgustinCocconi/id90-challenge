import { createAction, props } from '@ngrx/store';
import { GetHotelsParams } from 'src/app/shared/interfaces/get-hotels-params.interface';
export const GET_HOTELS = '[Hotels Page] Get Hotels';
export const GET_HOTELS_SUCCESS = '[Hotels Page] Get Hotels Success';
export const GET_HOTELS_FAILURE = '[Hotels Page] Get Hotels Failure';


export const getHotels = createAction(
    GET_HOTELS,
    props<{ params: GetHotelsParams }>()
);

export const getHotelsSuccess = createAction(
    GET_HOTELS_SUCCESS,
    props<any>()
);

export const getHotelsFailure = createAction(
    GET_HOTELS_FAILURE,
    props<{ error: any }>()
);
