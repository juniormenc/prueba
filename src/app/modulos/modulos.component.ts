import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'modulos-root',
    templateUrl: './modulos.html',
    styleUrls: ['./modulos.scss']
})
export class ModulosComponent implements OnInit {
    bandera: boolean = false;
    
    constructor(private router: Router){}

    ngOnInit() {

    }

}
