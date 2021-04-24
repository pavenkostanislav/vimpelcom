import { createFeatureSelector, createSelector } from '@ngrx/store';
import { smartphonesNode, smartphonesState } from './reducers/list.reducer';

const selectData = createFeatureSelector<smartphonesState>(smartphonesNode);

export const selectProductList = createSelector(
  selectData,
  (state: smartphonesState) => state.productList
);
export const selectFilters = createSelector(
  selectData,
  (state: smartphonesState) => state.filters
);
export const selectPaging = createSelector(
  selectData,
  (state: smartphonesState) => state.paging
);
