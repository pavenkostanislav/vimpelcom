import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { filter } from 'lodash';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-table-http-example',
  templateUrl: './table-http-example.component.html',
  styleUrls: ['./table-http-example.component.scss'],
})
export class TableHttpExampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['thumbImageUrlConverted']; // ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDatabase | null | undefined;
  productListApi: Observable<Array<ProductListApi>> | [] = [];
  filters: Array<Filter> | [] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  showFiller = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('paginator', { read: ElementRef })
  paginatorElementRef: ElementRef;
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

  constructor(private _httpClient: HttpClient, private _renderer: Renderer2) {}
  decimalPipe = new DecimalPipe(navigator.language);
  ngAfterViewInit(): void {
    this.paginator._intl.getRangeLabel = () => '';

    // this._renderer.insertBefore(
    //   this.paginatorElementRef.nativeElement.querySelector(
    //     '.mat-paginator-navigation-next.mat-icon-button'
    //   ).parentNode,
    //   this.paginatorElementRef.nativeElement.querySelector(
    //     '.mat-paginator-range-label'
    //   ),
    //   this.paginatorElementRef.nativeElement.querySelector(
    //     '.mat-paginator-navigation-next.mat-icon-button'
    //   )
    // );

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    setTimeout(() => {
      if (this.paginator === undefined || this.sort === undefined) {
        return;
      }
      this.productListApi = merge(
        this.sort.sortChange,
        this.paginator.page
      ).pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getMetaApi(
            this.sort?.active,
            this.sort?.direction,
            this.paginator?.pageIndex,
            this.filterForm.value
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.body.products.paging.totalCount;
          this.filters = data.body.filters;
          const filtersReduce = this.filters.reduce(
            (acc: Object, curr: Filter) => {
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
            },
            {}
          ) as { [key: string]: AbstractControl };
          this.filterForm = new FormGroup(filtersReduce);
          return data.body.products.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
    });
  }

  resetPaging(): void {
    if (this.paginator === undefined) {
      return;
    }
    this.paginator.pageIndex = 0;
  }
}

export interface Filter {
  name: string;
  key: string;
  slug: string;
  type: string;
  isOpen: boolean;
  options: Array<FilterOption> | null;
  isSeoUrlAllowed: boolean;

  //selector
  intagId?: string;

  //slider
  valueFrom?: null;
  valueTo?: null;
  min?: number;
  max?: number;
}

export interface FilterOption {
  name: string;
  color: string | null;
  slug: string;
  isChecked: boolean;
  isDisabled: boolean;
  productsCount: number;
}

export interface MetaApi {
  body: {
    products: ProductApi;
    filters: Array<Filter>;
  };
}

export interface ProductApi {
  list: Array<ProductListApi>;
  updateMethodUrl: string;
  paging: {
    perPage: number;
    currentPage: number;
    totalCount: number;
  };
  requestUnexpectedErrorMessage: string;
  requestEmptyListErrorMessage: string;
}

export interface ProductListApi {
  hasLeasing: true;
  id: number;
  isTariff: boolean;
  dpcId: number;
  name: string;
  article: string;
  brandName: string;
  thumbImageUrlConverted: string;
  oldPriceIfBundle: number;
  oldPriceIfBundleFormatted: string;
  isPromoPriceMoreThanLimit: boolean;
  regionProduct: {
    price: number;
    soc: string;
    oldPrice: null;
    remain: number;
    remainOp: boolean;
    label: null;
    marketingTag: null;
    promotionId: number;
    deliveryMethods: Array<MethodApi>;
    dpcId: number;
    discount: number;
    discountFormatted: string;
    hideOldPrice: false;
    hasOldPrice: false;
    shopActionIsAuthorized: null;
    shopActionRelatedIds: null;
    shopRelatedServices: null;
    shopActionCampaigns: null;
    bonusCount: number;
    regionId: number;
  };
  isPreorder: boolean;
  contentPromotion: null;
  benefits: Array<any>;
  urlSlug: string;
  hasPreorderAnnouncement: boolean;
  preorderAnnouncement: null;
  showPreorderDate: boolean;
  showPreorderPriceOnView: boolean;
  preorderStartDate: string;
  parameters: Array<ParameterApi>;
  showPreorderDateOnly: boolean;
  badges: Array<any>;
  rate: number;
  feedbackCount: number;
  hasRemainsShop: boolean;
  hasRemainsOffice: boolean;
  isPromotionBundle: boolean;
  productPromotion: null;
  mainEquipmentBundleNote: string;
  additionalEquipmentBundleNote: null;
  isOutOfStock: boolean;
  outOfStockReasonSlug: null;
  outOfStockMessageTemplate: null;
  isMultiCard: boolean;
  multiProductId: number;
  partnerSlug: null;
  delivery: {
    methods: Array<MethodApi>;
    useMethods: boolean;
    pickupUrl: string;
    courierUrl: string;
  };
  esim: {
    hasESim: boolean;
  };
}

export interface deliveryMethods {
  type: string;
  price: number;
  delay: null;
  startTime: null;
  endTime: null;
}

export interface MethodApi {
  type: string;
  price: number;
  delay: null;
  startTime: null;
  endTime: null;
}

export interface ParameterApi {
  id: string;
  detailsSlugOrId: number;
  productName: null;
  productId: number;
  shopProductId: number;
  value: string;
  link: null;
  weight: null;
  childValues: null;
  isMultiple: false;
  filterKind: number;
  intagSlug: string;
  intagWeight: number;
  isColor: boolean;
  isUnlimited: boolean;
  unitDisplay: null;
  numValue: null;
  hint: string; //html
  name: string;
  seoKeywords: null;
  seoDescriptions: null;
  seoTitle: null;
  isIndexing: boolean;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getMetaApi(
    sort?: string,
    order?: string,
    page?: number,
    filterForm?: Object
  ): Observable<MetaApi> {
    const href = 'http://localhost:3000/api/list'; // './assets/meta.json';
    const body = _.merge(
      sort ? { sort } : undefined,
      order ? { order } : undefined,
      page ? { page: (page++).toString() } : undefined,
      { filter: filterForm }
    );

    return this._httpClient.post<MetaApi>(href, body);
  }
}
