import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class ToasterService {

    options: IndividualConfig;

    constructor(
        private toastr: ToastrService
    ) {
        this.options = this.toastr.toastrConfig;
        this.options.positionClass = 'toast-top-right';
        this.options.timeOut = 2500;
    }

    showToast(title, message, type) {
        this.toastr.show(message, title, this.options, 'toast-' + type);
    }

    showError(title, message) {
        this.toastr.error(message, title, this.options);
    }

    showSuccess(title, message) {
        this.toastr.success(message, title, this.options);
    }
    showHTMLMessage(message, title) {
        this.toastr.success(message, title, { enableHtml :  true , timeOut : 1500 });
    }
}