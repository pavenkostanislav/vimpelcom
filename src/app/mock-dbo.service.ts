import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Filter, FilterForm, MetaApi, MockDboData } from './meta.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDboService {
  constructor(private _httpClient: HttpClient) {}

  getMetaApi(
    mockDboData: MockDboData
  ): Observable<MetaApi> {
    console.log('getMetaApi');
    const test_1 = './assets/test_1.json';
    const test_1_1 = './assets/test_1_1.json';
    const test_1_2 = './assets/test_1_2.json';
    const test_1_3 = './assets/test_1_3.json';
    const test_1_4 = './assets/test_1_4.json';
    const test_1_5 = './assets/test_1_5.json';
    return this._httpClient.get<MetaApi>(test_1).pipe(
      tap((data) => console.log(data)),
      map((data) => {
        data.body.products.paging = {
          perPage: +mockDboData.paging.itemsPerPage,
          currentPage: +mockDboData.paging.currentPage,
          totalCount: +mockDboData.paging.totalItems,
        };

        data.body.filters = _.map(data.body.filters, (f) => f);

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
