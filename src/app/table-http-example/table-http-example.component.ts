import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Filter, ProductListApi } from '../meta.interface';
import { MockDboAction } from '../mock-dbo.actions';
import {
  selectFilters,
  selectPaging,
  selectProductList,
} from '../mock-dbo.selectors';
import { MockDboService } from '../mock-dbo.service';
import { smartphonesState } from '../reducers/list.reducer';

@Component({
  selector: 'app-table-http-example',
  templateUrl: './table-http-example.component.html',
  styleUrls: ['./table-http-example.component.scss'],
})
export class TableHttpExampleComponent implements OnInit {
  productList$: Observable<Array<ProductListApi>> = this.store$
    .select(selectProductList)
    .pipe(
      tap((data) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.productListApi = data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    );

  filters$: Observable<Array<Filter>> = this.store$.select(selectFilters).pipe(
    tap((data) => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.filters = data;
      const filtersReduce = this.filters.reduce((acc: Object, curr: Filter) => {
        const key = curr.key;
        switch (curr.type) {
          case 'range':
            return (
              (acc[key] = new FormControl([
                curr.valueFrom || 0,
                curr.valueTo || 100,
              ])),
              acc
            );
          case 'common':
          case 'color':
            return (
              (acc[key] = new FormArray(
                curr.options.map(
                  (o) =>
                    new FormControl({
                      value: o.isChecked,
                      disabled: o.isDisabled,
                    })
                )
              )),
              acc
            );
          default:
            return (acc[key] = ''), acc;
        }
      }, {}) as { [key: string]: AbstractControl };
      this.filterForm = new FormGroup(filtersReduce);
      return this.productListApi;
    }),
    catchError(() => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      return observableOf([]);
    })
  );

  paging$: Observable<PaginatePipeArgs> = this.store$.select(selectPaging).pipe(
    tap((data) => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.pagingConfig = {
        ...this.pagingConfig,
        ...data,
      };
    }),
    catchError((er) => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      return observableOf(er);
    })
  );

  productListApi: Array<ProductListApi> | undefined;
  filters: Array<Filter> | [] = [];

  pagingConfig: PaginatePipeArgs = {
    itemsPerPage: 24,
    currentPage: 2,
    totalItems: 443,
  };
  isLoadingResults = true;
  isRateLimitReached = false;

  showFiller = false;

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  filterForm = new FormGroup({});

  getFormArray(key: string): FormArray {
    return this.filterForm.get(key) as FormArray;
  }

  getFormControl(key: string): FormControl {
    return this.filterForm.get(key) as FormControl;
  }

  getOption(k: number, i: number, key: string) {
    return (this.filters[k] as any).options[i][key] as string;
  }

  constructor(
    private store$: Store<smartphonesState>,
    private _httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.isLoadingResults = true;
    this.store$.dispatch(
      new MockDboAction({ paging: this.pagingConfig, filters: this.filters })
    );
    this.productList$.subscribe();
    this.filters$.subscribe();
    this.paging$.subscribe();
  }

  setPage(index?: number): void {
    this.pagingConfig = {
      ...this.pagingConfig,
      currentPage: index || 0,
    };
    this.store$.dispatch(
      new MockDboAction({ paging: this.pagingConfig, filters: this.filters })
    );
  }
}
