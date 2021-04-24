import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Filter, ProductListApi } from '../meta.interface';
import { MockDbo, MockDboActions } from '../mock-dbo.actions';

export const smartphonesNode = '[Smartphones]';

export interface smartphonesState {
  productList: Array<ProductListApi>;
  filters: Array<Filter>;
  paging: PaginatePipeArgs;
}

const initialState: smartphonesState = {
  productList: [],
  filters: [],
  paging: null,
};

export function listDataReducer(
  state: smartphonesState = initialState,
  action: MockDbo
) {
  switch (action.type) {
    case MockDboActions.MetaApiLoadedSuccess:
      return {
        ...state,
        productList: action.payload.productList,
        filters: action.payload.filters,
        paging: action.payload.paging,
      };
    case MockDboActions.MetaApiLoadedError:
      return {
        ...state,
        productList: [],
        filters: [],
        paging: null,
      };
    default:
      return state;
  }
}
