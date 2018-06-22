import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as constantes from './../servicios/global/constantes';

declare const $: any;

export let ROUTES: any[];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    token: string;
    //urlApp:string = constantes.urlApp;
    private sidebarPlantilla: any[];
    private permisosMenuRRHH: any;
    private permisosMenuConfiguracion: any;
    private permisosSeguridad: any;
    private biIdUsuarioSistemaSede: number;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        ROUTES = [];
        this.dibujarPanel();
    }

    dibujarPanel(){
        
        var rolId = parseInt(localStorage.getItem("rolId"));
        //console.log(rolId);

        if(rolId == 1){
            this.sidebarPlantilla = [
                //INICIO
                /*{
                    path: 'inicio', title: 'Inicio', icon: 'fa fa-home', vcObjeto: 'modulo-login',children: []
                },*/
                
                //USUARIO MÉDICO
                /*{
                    path: 'gestionar', title: 'G. Médico', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                        { path: 'cita-paciente', title: 'Citas del día', vcObjeto: 'cita-paciente-listar', enabled: true }
                    ]
                },
                {
                    path: 'reporte', title: 'R. Médico', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                        { path: 'reporte/reporte-turnos', title: 'Turnos de Atención', vcObjeto: 'reporte-turnos', enabled: true },
                        { path: 'reporte/reporte-atenciones', title: 'Atenciones e Ingresos', vcObjeto: 'reporte-atenciones', enabled: true }
                    ]
                },*/
                
                //USUARIO RECEPCIONISTA
                {
                    path: 'gestionar', title: 'G. Recepcionista', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                        { path: 'paciente', title: 'Pacientes y Citas', vcObjeto: 'paciente-listar', enabled: true },
                        { path: 'reserva', title: 'Reservas Pendientes', vcObjeto: 'reserva-listar', enabled: true }
                    ]
                },
                {
                    path: 'reporte', title: 'R. Recepcionista', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                        { path: 'reporte/reporte-reservas', title: 'Reservas', vcObjeto: 'reporte-reservas', enabled: true },
                        { path: 'reporte/reporte-citas', title: 'Citas', vcObjeto: 'reporte-citas', enabled: true }
                    ]
                },
        
                //USUARIO ORGANIZADOR
                {
                    path: 'gestionar', title: 'G. Organizador', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                        { path: 'horario', title: 'Horarios', vcObjeto: 'horario-listar', enabled: true },
                        { path: 'consultorio', title: 'Consultorios', vcObjeto: 'consultorio-listar', enabled: true },
                        { path: 'turno-atencion', title: 'Turnos de atención', vcObjeto: 'turno-atencion-listar', enabled: true }
                    ]
                },
                {
                    path: 'reporte', title: 'R. Organizador', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                        { path: 'reporte/reporte-turnos-medico', title: 'Turnos Médicos', vcObjeto: 'reporte-turnos-medico', enabled: true }
                    ]
                },
        
                //USUARIO SUPERVISOR
                {
                    path: 'reporte', title: 'R. Supervisor', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                        { path: 'reporte/reporte-turnos-medico', title: 'Turnos Médicos', vcObjeto: 'reporte-turnos-medico', enabled: true },
                        { path: 'reporte/reporte-ingresos-citas', title: 'Ingresos de Citas', vcObjeto: 'reporte-ingresos-citas', enabled: true },
                        { path: 'reporte/reporte-ingresos-citas-especialidad-medico', title: 'Ingresos de Citas (Especialidad)', vcObjeto: 'reporte-ingresos-citas-especialidad-medico', enabled: true },
                        { path: 'reporte/reporte-historias-paciente', title: 'Historias Clínicas', vcObjeto: 'reporte-historias-paciente', enabled: true }
                    ]
                },
        
                //USUARIO SUPERUSUARIO
                /*
                {
                    path: 'gestionar-principal', title: 'G. Superusuario', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar-principal', children: [
                        { path: 'usuario', title: 'Usuarios', vcObjeto: 'usuario-listar', enabled: true },
                        { path: 'medico', title: 'Médicos', vcObjeto: 'medico-listar', enabled: true },
                        { path: 'especialidad', title: 'Especialidades', vcObjeto: 'especialidad-listar', enabled: true }
                    ]
                }
                */
            ];
        } else {
            if(rolId == 2){
                this.sidebarPlantilla = [
                    
                    //USUARIO MÉDICO
                    {
                        path: 'gestionar', title: 'Gestionar', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                            { path: 'cita-paciente', title: 'Citas del día', vcObjeto: 'cita-paciente-listar', enabled: true }
                        ]
                    },
                    {
                        path: 'reporte', title: 'Reportes', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                            { path: 'reporte/reporte-turnos', title: 'Turnos de Atención', vcObjeto: 'reporte-turnos', enabled: true },
                            { path: 'reporte/reporte-atenciones', title: 'Atenciones e Ingresos', vcObjeto: 'reporte-atenciones', enabled: true }
                        ]
                    }
                ];
            } else {
                if(rolId == 3){
                    this.sidebarPlantilla = [
                        
                        //USUARIO RECEPCIONISTA
                        {
                            path: 'gestionar', title: 'Gestionar', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                                { path: 'paciente', title: 'Pacientes y Citas', vcObjeto: 'paciente-listar', enabled: true },
                                { path: 'reserva', title: 'Reservas Pendientes', vcObjeto: 'reserva-listar', enabled: true }
                            ]
                        },
                        {
                            path: 'reporte', title: 'Reportes', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                                { path: 'reporte/reporte-reservas', title: 'Reservas', vcObjeto: 'reporte-reservas', enabled: true },
                                { path: 'reporte/reporte-citas', title: 'Citas', vcObjeto: 'reporte-citas', enabled: true }
                            ]
                        }
                    ];
                } else {
                    if(rolId == 4) {
                        this.sidebarPlantilla = [
                            
                            //USUARIO ORGANIZADOR
                            {
                                path: 'gestionar', title: 'Gestionar', icon: 'fa fa-book', vcObjeto: 'modulo-gestionar', children: [
                                    { path: 'horario', title: 'Horarios', vcObjeto: 'horario-listar', enabled: true },
                                    { path: 'consultorio', title: 'Consultorios', vcObjeto: 'consultorio-listar', enabled: true },
                                    { path: 'turno-atencion', title: 'Turnos de atención', vcObjeto: 'turno-atencion-listar', enabled: true }
                                ]
                            },
                            {
                                path: 'reporte', title: 'Reportes', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                                    { path: 'reporte/reporte-turnos-medico', title: 'Turnos Médicos', vcObjeto: 'reporte-turnos-medico', enabled: true }
                                ]
                            }
                        ];
                    } else {
                        if(rolId == 5) {
                            this.sidebarPlantilla = [
                                
                                //USUARIO SUPERVISOR
                                {
                                    path: 'reporte', title: 'Reportes', icon: 'fa fa-book', vcObjeto: 'modulo-reporte', children: [
                                        { path: 'reporte/reporte-turnos-medico', title: 'Turnos Médicos', vcObjeto: 'reporte-turnos-medico', enabled: true },
                                        { path: 'reporte/reporte-ingresos-citas', title: 'Ingresos de Citas', vcObjeto: 'reporte-ingresos-citas', enabled: true },
                                        { path: 'reporte/reporte-ingresos-citas-especialidad-medico', title: 'Ingresos de Citas (Especialidad)', vcObjeto: 'reporte-ingresos-citas-especialidad-medico', enabled: true },
                                        { path: 'reporte/reporte-historias-paciente', title: 'Historias Clínicas', vcObjeto: 'reporte-historias-paciente', enabled: true }
                                    ]
                                }
                            ];
                        }
                    }
                }
            }
        }
        

        for (let m = 0; m < this.sidebarPlantilla.length; ++m) {
            this.generarSidebar(this.sidebarPlantilla[m], ROUTES);
        }

        this.menuItems = ROUTES.filter(menuItem => menuItem);
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