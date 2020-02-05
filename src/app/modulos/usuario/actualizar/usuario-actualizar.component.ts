import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as decode from 'jwt-decode';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SettingsService } from '../../../servicios/global/settings.service';
import { UsuarioService } from 'app/servicios/modulos/usuario.services';
import { RolService } from 'app/servicios/modulos/rol.services';

@Component({
  selector: 'usuario-actualizar',
  templateUrl: './usuario-actualizar.component.html',
  styleUrls: ['./usuario-actualizar.component.css']
})
export class UsuarioActualizarComponent implements OnInit {

  id: any;
  loading: boolean = true;

  e_rol: Array<any>;
  
  estado: boolean;
  rol: any;
  nombre: any;
  clave_nueva: any;
  usuario: any;
  correo: any;

  rolId: any;
  contador: any = 0;

  constructor(
    private settingsService: SettingsService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (localStorage.getItem('rol') == null) {
      this.router.navigate(['login']);
    }

    this.rolId = localStorage.getItem('rol');
  }

  ngOnInit() {
    this.clave_nueva = "";
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getUsuario(this.id);

  }

  getUsuario(id){
    this.loading = true;
    this.listarRoles();
    this.usuarioService.listar_usuario_id(id).then(data => {
      this.loading = false;
      // console.log(data.recordSet.element)
      this.usuario = data.recordSet.element.usuario;
      this.nombre = data.recordSet.element.nombre;
      this.correo = data.recordSet.element.correo;
      this.rol = data.recordSet.element.rol_id;
      this.estado = data.recordSet.element.estado;
    })
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

  modificar(){
    if (this.usuario == "") {
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
            this.usuarioService.modificar(this.id, this.usuario, this.rol, this.nombre, this.correo).then(data => {
                this.router.navigate(["modulos/usuario"]);
              this.settingsService.showNotification('top','right', this.settingsService.mensaje.modificar, 2);
            })
          }
        }
      }
    }
  }

  modificarClave(){
    if (this.clave_nueva == "") {
      this.settingsService.showNotification("top", "right", this.settingsService.mensaje.campos_vacios, 4);
    } else {
      this.usuarioService.cambiarClaveId(this.id, this.clave_nueva).then(data => {
        this.loading = false;
        // console.log(data.recordSet.element)
        this.settingsService.showNotification('top','right', this.settingsService.mensaje.modificar, 2);
        this.router.navigate(["modulos/usuario"]);
      })
    }
  }

  regresar(){
    this.router.navigate(["modulos/usuario"]);
  }

}
