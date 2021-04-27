import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MetaApi, MockDboData } from './meta.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDboService {
  constructor(private _httpClient: HttpClient) {}

  getMetaApi(mockDboData: MockDboData): Observable<MetaApi> {
    console.log('getMetaApi');
    const test_1 = './assets/test_1.json';
    const test_1_1 = './assets/test_1_1.json';
    const test_1_2 = './assets/test_1_2.json';
    const test_1_3 = './assets/test_1_3.json';
    const test_1_4 = './assets/test_1_4.json';
    const test_1_5 = './assets/test_1_5.json';
    let json = test_1;
    if (
      _.first(mockDboData.filterForm.price) === 100000 &&
      _.last(mockDboData.filterForm.price) === 105000
    ) {
      json = test_1_2;
    }
    return this._httpClient.get<MetaApi>(test_1).pipe(
      tap((data) => console.log(data)),
      map((data) => {
        data.body.filters[0].valueFrom = _.first(mockDboData.filterForm.price);
        data.body.filters[0].valueTo = _.last(mockDboData.filterForm.price);

        data.body.products.paging = {
          perPage: +mockDboData.paging.itemsPerPage,
          currentPage: +mockDboData.paging.currentPage,
          totalCount: +mockDboData.paging.totalItems,
        };

        //data.body.products.list = data.body.products.list.filter((item) =>
        // (!filters[0]?.min ||
        //   (filters[0].min && item.regionProduct.price >= filters[0].min)) &&
        // (!filters[0]?.max ||
        //   (filters[0].max && item.regionProduct.price <= filters[0].max))
        //filters[3].options.some((opt) => true)
        //);
        return data;
      })
    );
  }
}
