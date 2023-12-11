import { OkItemService } from './../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, OrgDept, OrgPost } from './dept.api';
import { OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Org } from '../org.api';

@Injectable({
  providedIn: 'root',
})
export class DeptService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  getCurrentOrg(): Observable<Org> {
    return this.http.get<OkResult<Org>>(api.getCurrentOrg).pipe(map((r: OkResult<Org>) => r.data));
  }

  getChildren(): Observable<OrgDept[]> {
    return this.http
      .get<OkResult<OrgDept[]>>(api.getChildren)
      .pipe(map((r: OkResult<OrgDept[]>) => r.data));
  }

  children(parentId: number, params = {}): Observable<OrgDept[]> {
    return this.http
      .get<OkResult<OrgDept[]>>(api.children + parentId, { params })
      .pipe(map((r: OkResult<OrgDept[]>) => r.data));
  }

  findPostByDept(id: number, params = {}): Observable<OrgDept[]> {
    return this.http
      .get<OkResult<OrgDept[]>>(api.findUserByDept + id, { params })
      .pipe(map((r: OkResult<OrgDept[]>) => r.data));
  }

  deleteById(id: number, params = {}): Observable<boolean> {
    return this.http
      .delete<OkResult<boolean>>(api.deleteById + id, { params })
      .pipe(map((r: OkResult<boolean>) => r.data));
  }

  // sync(params = {}): Observable<User[]> {
  //   return this.http
  //     .put<OkResult<User[]>>(api.sync, { params })
  //     .pipe(map((r: OkResult<User[]>) => r.data));
  // }

  // syncUser(params = {}): Observable<User[]> {
  //   return this.http
  //     .put<OkResult<User[]>>(api.syncUser, { params })
  //     .pipe(map((r: OkResult<User[]>) => r.data));
  // }

  savePost(post: OrgPost) {
    return this.http
      .post<OkResult<boolean>>(api.savePost, post)
      .pipe(map((r: OkResult<boolean>) => r.data));
  }
}
