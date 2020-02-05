import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { UsuarioService } from 'app/servicios/modulos/usuario.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

    // MatPaginator Inputs
    pageSizeOptions: any[] = [10, 25, 50, 100];
    length: number = 0;
    offset: number = 0;
    limit: number = this.pageSizeOptions[0];
    loading: boolean = true;
    vistaPantalla: boolean = false;
  
    val_usu: any;
    e_usuario: Array<any>;

    id: any;
    contador: any = 0;

    //HABILITADORES
    hab_btn_registrar: boolean = false;
    hab_btn_habilitar: boolean = false;
    hab_btn_activar: boolean = false;
    hab_btn_editar: boolean = false;
  
    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
      private settingsService: SettingsService,
    ) {
      if (localStorage.getItem('rol') == null) {
        this.router.navigate(['login']);
      }
      
    }
  
    ngOnInit() {
      this.vistaPantalla = true;
      this.limpiar();

      if (localStorage.getItem('rol') === '2') {
        this.hab_btn_registrar = true;
          this.hab_btn_habilitar = true;
          this.hab_btn_activar = true;
          this.hab_btn_editar = true;
      } else {
        if (localStorage.getItem('rol') === '3') {
          this.hab_btn_registrar = true;
        }
      }
    }
  
    limpiar(){
      this.listarTodos();
      this.val_usu = "";
    }
  
    filtro(valor:string){
      valor = valor.trim();
      valor = valor.toLocaleLowerCase();
      // console.log(valor)
      if(valor.length > 0){
        this.listar(valor);
      }else{
        this.listarTodos();
      }
    }
  
    listar(valor){
      this.loading = true;
      this.e_usuario = [];
      this.usuarioService.listar_filtro(valor).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        //  console.log(data.recordSet.element)
      })
    }
  
    deAlta(id){
      this.usuarioService.habilitar(id).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        //  console.log(data.recordSet.element)
        this.settingsService.showNotification("top", "right", this.settingsService.mensaje.dealta, 2);
        this.limpiar();
      })
    }

    deBaja(id){
      this.usuarioService.inhabilitar(id).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        //  console.log(data.recordSet.element)
        this.settingsService.showNotification("top", "right", this.settingsService.mensaje.debaja, 4);
        this.limpiar();
      })
    }

    activar(id){
      this.usuarioService.activar(id).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        //  console.log(data.recordSet.element)
        this.settingsService.showNotification("top", "right", this.settingsService.mensaje.dealta, 2);
        this.limpiar();
      })
    }

    desactivar(id){
      this.usuarioService.desactivar(id).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        //  console.log(data.recordSet.element)
        this.settingsService.showNotification("top", "right", this.settingsService.mensaje.debaja, 4);
        this.limpiar();
      })
    }

    listarTodos(){
      this.loading = true;
      this.e_usuario = [];
      this.usuarioService.listar(this.offset, this.limit).then(data => {
        this.e_usuario = data.recordSet.element;
        this.loading = false;
        // console.log(data.recordSet.element)
        this.length = data.recordSet.cantidadTotal;
      })
    }

    setPageSizeOptions(data) {
      this.offset = data.pageIndex * data.pageSize;
      this.limit = data.pageSize;
      if(this.val_usu == ""){
        this.listarTodos();
      }else{
        this.listar(this.val_usu);
      }
    }
  
    registrar(){
      this.router.navigate(['modulos/usuario/registrar']);
    }
  
    modificar(id){
      this.router.navigate(['modulos/usuario/actualizar', id]);
    }
  
    asignarPermisos(id){
      this.router.navigate(['modulos/usuario/rol', id]);
    }
}
