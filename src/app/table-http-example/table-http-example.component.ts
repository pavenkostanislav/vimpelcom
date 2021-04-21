import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table-http-example',
  templateUrl: './table-http-example.component.html',
  styleUrls: ['./table-http-example.component.scss'],
})
export class TableHttpExampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['thumbImageUrlConverted']; // ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDatabase | null | undefined;
  filteredAndPagedIssues: Observable<Array<ProductListApi>> | [] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    setTimeout(() => {
      if (this.paginator === undefined || this.sort === undefined) {
        return;
      }
      this.filteredAndPagedIssues = merge(
        this.sort.sortChange,
        this.paginator.page
      ).pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort?.active,
            this.sort?.direction,
            this.paginator?.pageIndex
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.paging.totalCount;

          return data.list;
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

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface MetaApi {
  body: {
    products: ProductApi;
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

  getRepoIssues(
    sort?: string,
    order?: string,
    page?: number
  ): Observable<ProductApi> {
    const href = 'https://api.github.com/search/issues';
    const params = _.merge(
      { q: 'repo:angular/components' },
      sort ? { sort } : undefined,
      order ? { order } : undefined,
      page ? { page: (page++).toString() } : undefined
    );
    return this._httpClient
      .get<MetaApi>('./assets/meta.json')
      .pipe(map((data) => data.body.products));

    // return this._httpClient.get<GithubApi>(href, { params });
  }
}
