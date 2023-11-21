import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { OkGroup } from '@shared/api/ok';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OkItemService } from '@shared/services/ok-item.service';

export class OkItemComponent {
  translateSubscription = Subscription.EMPTY;
  backParams = {};
  group: FormGroup;

  isLoading: boolean = false;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected service: OkItemService,
    protected okGroup: OkGroup
  ) {
    this.group = this.fb.group(this.okGroup);
  }

  getDetail(id: string): Observable<any> {
    return this.service.getDetail(id);
  }

  get params() {
    const p = Object.assign({}, this.group.value);
    return p;
  }
}
