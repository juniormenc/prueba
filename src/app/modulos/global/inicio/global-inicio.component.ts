import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
    selector: 'global-inicio',
    templateUrl: './global-inicio.component.html',
    styleUrls: ['./global-inicio.component.scss']
})

export class GlobalInicioComponent {

    cantidad: number;
    bandera: boolean = false;
    tokenPayload: any;
    public permisos: any;
    usuario: any;
    id: any;

    constructor(
        private router: Router,
    ) {
        if (localStorage.getItem('rol') == null) {
            this.router.navigate(['/login']);
        }

        this.usuario = localStorage.getItem('nombre_us');

     }

    ngOnInit() {
        
    }
}
