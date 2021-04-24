import { InjectionToken } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { smartphonesNode, listDataReducer, smartphonesState } from './list.reducer';

export interface State {
  [smartphonesNode]: smartphonesState;
}

export const reducers: ActionReducerMap<State> = {
  [smartphonesNode]: listDataReducer,
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<State>>(
  'App Reducers'
);
export const reducerProvider = { provide: REDUCERS_TOKEN, useValue: reducers };

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
