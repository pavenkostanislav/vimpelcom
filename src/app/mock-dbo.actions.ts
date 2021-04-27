import { Action } from '@ngrx/store';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Filter, FilterForm, MockDboData, ProductListApi, Sort } from './meta.interface';

export enum MockDboActions {
  MetaApiLoad = '[Smartphones] GET ./assets/meta.json load',
  MetaApiLoadedSuccess = '[Smartphones] GET ./assets/meta.json loaded success',
  MetaApiLoadedError = '[Smartphones] GET ./assets/meta.json loaded error',
}

export class MockDboAction implements Action {
  readonly type = MockDboActions.MetaApiLoad;
  constructor(public payload: MockDboData) {}
}

export class MockDboLoadedSuccess implements Action {
  readonly type = MockDboActions.MetaApiLoadedSuccess;
  constructor(
    public payload: {
      productList: Array<ProductListApi>;
      filters: Array<Filter>;
      paging: PaginatePipeArgs;
    }
  ) {}
}

export class MockDboLoadedError implements Action {
  readonly type = MockDboActions.MetaApiLoadedError;
}

export type MockDbo = MockDboAction | MockDboLoadedSuccess | MockDboLoadedError;
