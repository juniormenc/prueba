import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { RolService } from 'app/servicios/modulos/rol.services'

declare const $: any;

export let ROUTES: any[];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    rolId: any;
    private sidebarPlantilla: any[];

    reportes: any;

    constructor(
        private router: Router,
        private rolService: RolService
    ) {
        this.rolId = localStorage.getItem('rol');
    }

    ngOnInit() {

        this.reportes = { path: 'inicio', title: '', icon: '', vcObjeto: '', children: [] };

        ROUTES = [];
        this.dibujarPanel();
        
    }

    dibujarPanel(){

            this.sidebarPlantilla = [
                
            {
                path: 'autorizacion', title: 'Autorización', icon: 'fa fa-shield', vcObjeto: 'modulo-gestionar-autorizacion', children: [
                    { path: 'usuario', title: 'Usuarios', vcObjeto: 'usuario-listar', enabled: true }
                ]
            },

        ];
        

        for (let m = 0; m < this.sidebarPlantilla.length; ++m) {
            this.generarSidebar(this.sidebarPlantilla[m], ROUTES);
        }

        this.menuItems = ROUTES.filter(menuItem => menuItem);
        //console.log(this.menuItems)
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    mandaInicio() {
        this.router.navigate(['/modulos/inicio']);
    }

    private generarSidebar(menu, sidebar: any[]) {

        if (menu.deleted == null) {
            let menuNuevo = {
                path: menu.path,
                title: menu.title,
                icon: menu.icon,
                url: menu.url,
                enabled: menu.enabled
            };

            sidebar.push(menuNuevo);

            if (menu.children != null) {
                menuNuevo['children'] = [];

                for (let h = 0; h < menu.children.length; ++h) {
                    this.generarSidebar(menu.children[h], menuNuevo['children']);
                }
            }
        }
    }

    
}