import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
//import { SpinerComponent } from '../../../recursos/spinner/spinner.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';


@Component({
  selector: 'turno-atencion-listar',
  templateUrl: './turno-atencion-listar.component.html',
  styleUrls: ['./turno-atencion-listar.component.css']
})
export class TurnoAtencionListarComponent implements OnInit {

  loading: boolean;
  elemento: Array<any>;
  fecha: any;
  buscar: any;

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 1){
      this.listar(valor);
    }else{
      if (valor.length == 0) {
        this.listar_todos();
      }
    }
  }

  constructor(public turnoAtencionService: TurnoAtencionService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  fecha_actual(){

    var v_mes, v_dia, v_anio;

    var m = new Date().getMonth()+1;
    var d = new Date().getDate();

    v_anio = new Date().getFullYear();

    if(m < 10){
      v_mes = "0" + (new Date().getMonth()+1);
    } else {
      v_mes = (new Date().getMonth()+1);
    }

    if(d < 10){
      v_dia = "0" + (new Date().getDate());
    } else {
      v_dia = new Date().getDate();
    }

    return v_anio + "-" + v_mes + "-" + v_dia;
  }

  ngOnInit() {
    this.fecha = this.fecha_actual();
    this.listar_todos();
  }

  listar_segun_fecha(){

    if (this.buscar == null || this.buscar == "") {
      this.listar_todos();
    }else{
      if(this.buscar.length > 1){
        this.listar(this.buscar);
      }else{
        
      }
    }
    
  }

  listar_todos(){

    this.loading = true;
    this.elemento = null;

    this.turnoAtencionService.listar_todos_hoy(this.fecha).then((data: any) =>{
      this.elemento = data.recordSet.element;
      this.loading = false;
    });
  }

  listar(filtro){

    this.loading = true;
    this.elemento = null;

    this.turnoAtencionService.listar_hoy(filtro, this.fecha).then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  goToRegistrar(){
    this.router.navigate(['modulos/turno-atencion/registrar']);
  }

  gotoEditar(id:number){
    //console.log(id);
    this.router.navigate(['modulos/turno-atencion/editar',id]);
  }

}
