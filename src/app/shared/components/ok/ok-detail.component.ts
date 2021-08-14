import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { leadApi } from 'app/routes/crm/saleslead/lead.api';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { OkPayload } from '@shared/api/ok';

export class OkDetailComponent {
  translateSubscription: Subscription;
  backParams = {};

  list = [];
  total = 0;
  isLoading = true;
  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;

  constructor(protected logger: NGXLogger, protected service: OkDetailService) {}

  getDetail(id: string, params = {}): Observable<OkPayload> {
    this.logger.info(leadApi);
    return this.service.getDetail(id);
  }
}
