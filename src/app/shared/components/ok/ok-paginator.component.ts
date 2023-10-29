import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ID, OkGroup, okPageGroup } from '@shared/api/ok';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

export class OkPaginatorComponent {
  translateSubscription = Subscription.EMPTY;
  group = new FormGroup<any>({});
  backParams: any = {};

  list = [];
  total = 0;
  isLoading = true;
  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;

  constructor(
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected logger: NGXLogger,
    protected okService: OkPaginatorService,
    protected okGroup: OkGroup
  ) {
    const p = Object.assign(this.okGroup, okPageGroup);
    this.group = this.fb.group(p);
  }

  get params() {
    const p = Object.assign({}, this.group.value);
    return p;
  }

  get pageIndex() {
    return this.group.get('page')?.value;
  }

  get pageSize() {
    return this.group.get('size')?.value;
  }

  changeSelect(e: any) {
    console.log('changeSelect', e);
  }

  changeSort(e: any) {
    console.log('changeSort', e);
  }

  getBackParams(param: any) {
    return this.backParams[param];
  }

  top(e: ID) {
    this.okService.top(e).subscribe(r => {
      this.logger.debug('top==>', r);
      this.getPage();
    });
  }

  delete(id: ID) {
    this.logger.info('delete...', id);
    this.okService.delete(id).subscribe(r => {
      this.logger.debug('delete==>', r);
      this.getPage();
    });
  }

  getNextPage(e: PageEvent) {
    this.group.get('page')?.setValue(e.pageIndex);
    this.group.get('size')?.setValue(e.pageSize);
    this.getPage();
  }

  resetPage() {
    this.group.get('page')?.setValue(0);
    this.group.get('size')?.setValue(10);
  }

  search() {
    this.group.get('page')?.setValue(0);
    this.getPage();
  }

  reset() {
    this.group.reset();
    this.resetPage();
    this.getPage();
  }

  getPage() {
    this.isLoading = true;
    this.okService.getPage(this.params).subscribe(
      res => {
        this.list = res.data.content;
        this.total = res.data.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
