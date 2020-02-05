import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SettingsService } from '../../../servicios/global/settings.service';
import { RolService } from 'app/servicios/modulos/rol.services';
import { UsuarioService } from 'app/servicios/modulos/usuario.services';

@Component({
  selector: 'usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.css']
})
export class UsuarioRegistrarComponent implements OnInit {

  usuario: any;
  clave: any;
  nombre: any;
  correo: any;
  rol: any;

  e_rol: Array<any>;
  loading: boolean = true;

  rolId: any;
  contador: any = 0;

  constructor(
    private settingsService: SettingsService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    if (localStorage.getItem('rol') == null) {
      this.router.navigate(['login']);
    }

    this.rolId = localStorage.getItem('rol');
  }

  ngOnInit() {
    this.usuario = "";
    this.clave = "";
    this.nombre = "";
    this.correo = "";
    this.rol = 0;
    this.listarRoles();
  }

  listarRoles(){
    this.loading = true;
    this.e_rol = [];
    this.rolService.listar_todos().then(data => {
      this.e_rol = data.recordSet.element;
      this.loading = false;
      // console.log(data.recordSet.element)
    })
  }

  registrar(){
    if (this.usuario == "") {
      this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
    } else {
      if (this.clave == "") {
        this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
      } else {
        if (this.nombre == "") {
          this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
        } else {
          if (this.correo == "") {
            this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
          } else {
            if (this.rol == 0) {
              this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
            } else {
              this.usuarioService.registrar(this.usuario, this.clave, this.rol, this.nombre, this.correo).then(data => {
                this.router.navigate(["modulos/usuario"]);
                this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
              })
            }
          }
        }
      }
    }
    
  }

  regresar(){
    this.router.navigate(["modulos/usuario"]);
  }

}
