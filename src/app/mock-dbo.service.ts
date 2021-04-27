import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Filter, FilterForm, MetaApi, MockDboData } from './meta.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDboService {
  findBy = (collention: Array<Filter>, name: string, key = 'key') =>
    _.find(collention, (item) => item[key] === name);
  constructor(private _httpClient: HttpClient) {}

  getMetaApi(mockDboData: MockDboData): Observable<MetaApi> {
    console.log('getMetaApi');
    const json = this.getMockJsonUrl(mockDboData.filterForm);

    return this._httpClient.get<MetaApi>(json).pipe(
      tap((data) => console.log(data)),
      map((data) => {
        if (
          +_.first(mockDboData.filterForm.price) === 100000 &&
          +_.last(mockDboData.filterForm.price) === 105000
        ) {
          this.findBy(data.body.filters, 'price').valueFrom = +_.first(
            mockDboData.filterForm.price
          );
          this.findBy(data.body.filters, 'price').valueTo = +_.last(
            mockDboData.filterForm.price
          );
        } else if (_.first(mockDboData.filterForm.actions)) {
          this.findBy(data.body.filters, 'actions').options[0].isChecked = true;
        } else if (_.first(mockDboData.filterForm.colors)) {
          this.findBy(data.body.filters, 'colors').options[0].isChecked = true;
        } else if (_.first(mockDboData.filterForm.rams)) {
          this.findBy(data.body.filters, 'rams').options[0].isChecked = true;
        }

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

  private getMockJsonUrl(filterForm: FilterForm): string {
    if (
      +_.first(filterForm.price) === 100000 &&
      +_.last(filterForm.price) === 105000
    ) {
      return './assets/test_1_2.json';
    }

    if (_.first(filterForm.actions)) {
      return './assets/test_1_1.json';
    }

    if (_.first(filterForm.colors)) {
      return './assets/test_1_3.json';
    }

    if (_.first(filterForm.rams)) {
      return './assets/test_1_4.json';
    }

    return './assets/test_1.json';
  }
}
