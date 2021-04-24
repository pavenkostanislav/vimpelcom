import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Filter } from './meta.interface';
import {
  MockDboActions,
  MockDboLoadedError,
  MockDboLoadedSuccess,
} from './mock-dbo.actions';
import { MockDboService } from './mock-dbo.service';

@Injectable()
export class MockDboEffects {
  constructor(private actions$: Actions, private mockDbo: MockDboService) {}

  @Effect()
  loanProduct$ = this.actions$.pipe(
    ofType(MockDboActions.MetaApiLoad),
    switchMap(
      (action: {
        payload: { paging: PaginatePipeArgs; filters: Array<Filter> };
      }) =>
        this.mockDbo
          .getMetaApi(action.payload.paging, action.payload.filters)
          .pipe(
            map(
              (data) =>
                new MockDboLoadedSuccess({
                  productList: data.body.products.list,
                  filters: data.body.filters,
                  paging: {
                    id: 'server',
                    itemsPerPage: data.body.products.paging.perPage,
                    currentPage: data.body.products.paging.currentPage,
                    totalItems: data.body.products.paging.totalCount,
                  },
                })
            ),
            catchError(() => of(new MockDboLoadedError()))
          )
    )
  );
}
