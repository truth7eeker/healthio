import { Injectable, inject } from '@angular/core'

import { ToastrService } from 'ngx-toastr'

@Injectable({
   providedIn: 'root',
})
export class AlertService {
   private toastr: ToastrService = inject(ToastrService)

   showWarningToastr(message: string) {
      this.toastr.warning(message, '')
   }

   showSuccessToastr(message: string) {
      this.toastr.success(message, '')
   }
}
