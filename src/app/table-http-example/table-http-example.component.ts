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
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDatabase | null | undefined;
  filteredAndPagedIssues: Observable<GithubIssue[]> | [] = [];

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
          this.resultsLength = data.total_count;

          return data.items;
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

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(
    sort?: string,
    order?: string,
    page?: number
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const params = _.merge(
      { q: 'repo:angular/components' },
      sort ? { sort } : undefined,
      order ? { order } : undefined,
      page ? { page: (page++).toString() } : undefined
    );

    return this._httpClient.get<GithubApi>(href, { params });
  }
}
