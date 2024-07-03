import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private toast: ToastrService) { }

    successToast(message: string) {
        this.toast.success(message);
    }

    errorToast(message: string) {
        this.toast.error(message);
    }
}
