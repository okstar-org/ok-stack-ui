import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RepoSearchList {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

@Injectable()
export class SalesleadService {
  constructor(private http: HttpClient) {}

  getData(params = {}): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('/api/portal/crm/saleslead/page', { params });
  }
}
