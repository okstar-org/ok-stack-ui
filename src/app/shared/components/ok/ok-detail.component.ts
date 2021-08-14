import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { leadApi } from 'app/routes/crm/saleslead/lead.api';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { OkGroup, okPageGroup, OkPayload } from '@shared/api/ok';
import { FormBuilder, FormGroup } from '@angular/forms';

export class OkDetailComponent {
  translateSubscription: Subscription;
  backParams = {};
  group: FormGroup;
  list = [];
  total = 0;
  isLoading = true;
  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected service: OkDetailService,
    protected okGroup: OkGroup
  ) {
    const p = Object.assign(this.okGroup, okPageGroup);
    this.group = this.fb.group(p);
  }

  getDetail(id: string, params = {}): Observable<OkPayload> {
    return this.service.getDetail(id);
  }

  get params() {
    const p = Object.assign({}, this.group.value);
    return p;
  }

  get pageIndex() {
    return this.group.get('page').value;
  }

  get pageSize() {
    return this.group.get('size').value;
  }

  getPage() {
    this.isLoading = true;
    this.service.getPage(this.params).subscribe(
      res => {
        this.list = res.data.content;
        this.total = res.data.totalElements;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
