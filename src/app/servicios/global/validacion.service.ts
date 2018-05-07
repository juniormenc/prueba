import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { BodyOutputType } from 'angular2-toaster';

@Injectable()
export class ValidacionService {

    toast: any = {};

    constructor(
        private toasterService: ToasterService
    ) { }

    ngOnInit() {
        this.limpiarToast();
    }

    limpiarToast() {
        this.toast = {
            type: 'error',
            title: 'Error',
            body: '',
            bodyOutputType: BodyOutputType.TrustedHtml
        };
    }

    validarCampos(campos: any[]): boolean {
        this.limpiarToast();
        let correcto: boolean = true;
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].texto == '' || campos[i].texto == 0 || campos[i].texto == undefined) {
                this.toast.body = this.toast.body + '• ' + campos[i].error + "<br/>"
                correcto = false;
            }
        }

        if (!correcto) {
            this.toasterService.pop(this.toast);
        }

        return correcto;
    }

}