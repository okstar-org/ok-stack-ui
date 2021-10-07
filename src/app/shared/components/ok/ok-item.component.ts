import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { OkGroup, OkPayload } from '@shared/api/ok';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OkItemService } from '@shared/services/ok-item.service';
import { OkOnSave } from './ok-on-save';

export class OkItemComponent {
  translateSubscription: Subscription;
  backParams = {};
  group: FormGroup;

  isLoading: boolean;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected service: OkItemService,
    protected okGroup: OkGroup
  ) {
    this.group = this.fb.group(this.okGroup);
  }

  getDetail(id: string, params = {}): Observable<OkPayload<any>> {
    return this.service.getDetail(id);
  }

  get params() {
    const p = Object.assign({}, this.group.value);
    return p;
  }
}
