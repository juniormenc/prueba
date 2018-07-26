import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'global-inicio',
    templateUrl: './global-inicio.component.html',
    styleUrls: ['./global-inicio.component.scss']
})

export class GlobalInicioComponent {

    cantidad: number;
    bandera: boolean = false;
    public permisos: any;

    constructor(
        private router: Router,
        private toasterService: ToasterService,
    ) {
        if (localStorage.getItem('id') == null) {
            this.router.navigate(['login']);
        }
     }

    ngOnInit() {
        /*if(localStorage.getItem('id') == null){
            this.router.navigate(['/login']);
        }
        console.log(localStorage.getItem('id'));*/
    }
}
