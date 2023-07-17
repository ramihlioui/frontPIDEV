import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private toastr  : ToastrService) { }
  showSuccess(message, title, timeOut = 3000) {
    this.toastr.success(message, title, {timeOut: timeOut, progressBar: true, closeButton: true});
  }

  showInfo(message, title, timeOut = 3000) {
    this.toastr.info(message, title, {timeOut: timeOut, progressBar: true, closeButton: true});
  }

  showError(message, title, timeOut = 3000) {
    this.toastr.error(message, title, {timeOut: timeOut, progressBar: true, closeButton: true});
  }

  showWarning(message, title, timeOut = 3000) {
    this.toastr.warning(message, title, {timeOut: timeOut, progressBar: true, closeButton: true});
  }

}
