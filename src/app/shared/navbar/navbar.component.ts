import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { SesionService } from '../../servicios/modulos/sesion.services';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    persona: any = {};

    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private modal: NgbModal,
        private sesionService: SesionService,
    ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        //this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
       
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.split('/').pop();
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Inicio';
    }

    public salir(): void {
        sessionStorage.clear();
        localStorage.removeItem('jwt');
        localStorage.removeItem('id');
        localStorage.removeItem('rolId');
        localStorage.clear();
        this.router.navigate(['/login']);
        
        /*
        this.sesionService.cerrarSesion().then((data: any) => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('id');
            localStorage.removeItem('rolId');
            //localStorage.removeItem('usuario');
            //localStorage.removeItem('medico_id');
            //localStorage.removeItem('paciente_id');
            this.router.navigate(['/login']);
        });
        */
        
    }
}
