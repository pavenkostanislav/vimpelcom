import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Filter, FilterForm, ProductListApi, Sort } from '../meta.interface';
import { MockDboAction } from '../mock-dbo.actions';
import {
  selectFilters,
  selectPaging,
  selectProductList,
} from '../mock-dbo.selectors';
import { smartphonesState } from '../reducers/list.reducer';

enum Design {
  list,
  grid,
}

@Component({
  selector: 'app-table-http-example',
  templateUrl: './table-http-example.component.html',
  styleUrls: ['./table-http-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  filters$: Observable<Array<Filter>> = this.store$.select(selectFilters);

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

  design = Design;
  view: Design = Design.list;

  filterForm = new FormGroup({});
  orderRate = true;
  orderPrice = true;
  sort: Sort = { key: 'rate', order: 'asc' };

  constructor(
    private store$: Store<smartphonesState>,
    private _httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.setFilter();
    this.productList$.subscribe();
    this.filters$.subscribe(
      (data) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.filters = data;
        const filtersReduce = this.filters.reduce(
          (acc: Object, curr: Filter) => {
            const key = curr.key;
            switch (curr.type) {
              case 'range':
                return (
                  (acc[key] = new FormControl([
                    curr.valueFrom || curr.min || 0,
                    curr.valueTo || curr.max || 150000,
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
          },
          {}
        ) as { [key: string]: AbstractControl };
        this.filterForm = new FormGroup(filtersReduce);
        return this.productListApi;
      },
      () => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      }
    );
    this.paging$.subscribe();
  }

  getFormArray(key: string, n: number): AbstractControl[] {
    const arr = this.filterForm.get(key) as FormArray;
    return _.take(arr.controls, n);
  }

  getFormControl(key: string): FormControl {
    return this.filterForm.get(key) as FormControl;
  }

  getOption(k: number, i: number, key: string) {
    return (this.filters[k] as any).options[i][key] as string;
  }

  setPage(index?: number): void {
    this.pagingConfig = {
      ...this.pagingConfig,
      currentPage: index || 0,
    };
    this.setFilter();
  }

  setSortRate() {
    this.orderRate = !this.orderRate;
    this.sort = { key: 'rate', order: this.orderRate ? 'asc' : 'desc' };
    this.setFilter();
  }

  setSortPrice() {
    this.orderPrice = !this.orderPrice;
    this.sort = { key: 'price', order: this.orderPrice ? 'asc' : 'desc' };
    this.setFilter();
  }

  setFilter(): void {
    const paging: PaginatePipeArgs = this.pagingConfig;
    const filterForm: FilterForm = this.filterForm.value;
    const sort: Sort = this.sort;
    this.store$.dispatch(new MockDboAction({ paging, filterForm, sort }));
  }

  rate = (rate: number, num: number): string =>
    rate >= num ? '' : rate > num - 1 ? '-half-o' : '-o';
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<div mat-dialog-content style="overflow: scroll;">
    <img width="1024px" src="./assets/screenshot.png" />
  </div>`,
})
export class DialogContentExampleDialog {}
