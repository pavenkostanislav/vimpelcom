import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Filter, MetaApi } from './meta.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDboService {
  constructor(private _httpClient: HttpClient) {}

  getMetaApi(
    paging?: PaginatePipeArgs,
    filters?: Array<Filter>
  ): Observable<MetaApi> {
    console.log('getMetaApi');
    const href = './assets/meta.json';
    return this._httpClient.get<MetaApi>(href).pipe(
      tap((data) => console.log(data)),
      map((data) => {
        data.body.products.paging = {
          perPage: +paging.itemsPerPage,
          currentPage: +paging.currentPage,
          totalCount: +paging.totalItems,
        };

        data.body.products.list = data.body.products.list.filter((item) =>
          // (!filters[0]?.min ||
          //   (filters[0].min && item.regionProduct.price >= filters[0].min)) &&
          // (!filters[0]?.max ||
          //   (filters[0].max && item.regionProduct.price <= filters[0].max))
          filters[3].options.some((opt) => true)
        );
        return data;
      })
    );
  }
}
