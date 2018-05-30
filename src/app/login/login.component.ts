import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import * as constantes from './../servicios/global/constantes';
import { SesionService } from '../servicios/modulos/sesion.services';
import { SettingsService } from '../servicios/global/settings.service';

@Component({
    selector: 'login-root',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

    fondo:any = {
        'background-image': 'url(./assets/img/fondo-login.jpg)',
        '-webkit-filter': 'brightness(40%)'
    }
    typePassword: string = "password";
    showPassword: boolean = false;
    vcUsuario: string;
    vbClave: string;
    //vcUsuario: string = "admin";
    //vbClave: string = "123";
    bandera: boolean = false;
    anio: any = new Date().getFullYear();
    
    constructor(
        private router: Router, 
        private toaster: ToasterService,
        private settingsService: SettingsService,
        private sesionService: SesionService) {
    }

    ngOnInit() {
    
    }

    logIn() {
        this.sesionService.login(this.vcUsuario,this.vbClave)
        .then((data: any) =>{
            //console.log(data);
            if(data.recordSet.count > 0){
                //console.log(data);
                localStorage.setItem("id", data.recordSet.element[0].id);
                localStorage.setItem("jwt", data.recordSet.element.token);
                localStorage.setItem("rolId", data.recordSet.element[0].rol_id);
                this.bandera = true;
                this.router.navigate(['modulos/inicio']);
                this.settingsService.showNotification('top','right', this.settingsService.mensaje.usuario_correcto, 1);
            }else{
                //console.log("usuario o clave incorrecto");
                this.settingsService.showNotification('top','right', this.settingsService.mensaje.usuario_error, 4);
                this.vcUsuario = "";
                this.vbClave = "";
            }

        });
        
    }

    mostrarContrasena() {
        this.showPassword = true;
        this.typePassword = "text";
    }

    ocultarContrasena() {
        this.showPassword = false;
        this.typePassword = "password";
    }
}