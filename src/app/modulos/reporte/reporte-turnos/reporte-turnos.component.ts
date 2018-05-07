import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';

@Component({
  selector: 'areporte-turnos',
  templateUrl: './reporte-turnos.component.html',
  styleUrls: ['./reporte-turnos.component.scss']
})
export class ReporteTurnosComponent implements OnInit {

  mes_anio: any;
  e_turnos: Array<any>;
  
  constructor(private turnoService: TurnoAtencionService) { }

  ngOnInit() {
    this.mes_anio = this.mes_anio_actual();
    this.cargarDatos();
  }

  mes_anio_actual(){

    var v_mes, v_anio;

    var m = new Date().getMonth()+1;

    v_anio = new Date().getFullYear();

    if(m < 10){
      v_mes = "0" + (new Date().getMonth()+1);
    } else {
      v_mes = (new Date().getMonth()+1);
    }

    return v_anio + "-" + v_mes;
  }

  getPrimerDia(fecha){
    
    var v_dia, v_mes, v_anio;
    
    var date = new Date(fecha);
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    
    var d = new Date(primerDia).getDate();
    var m = new Date(primerDia).getMonth()+1;
    v_anio = new Date(primerDia).getFullYear();
    
    if(m < 10){
      v_mes = "0" + m;
    } else {
      v_mes = m;
    }

    if(d < 10){
      v_dia = "0" + d;
    } else {
      v_dia = d;
    }

    return v_dia + "-" + v_mes + "-" + v_anio;
  }

  getUltimoDia(fecha){

    var v_dia, v_mes, v_anio;
    
    var date = new Date(fecha);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    var d = new Date(ultimoDia).getDate();
    var m = new Date(ultimoDia).getMonth()+1;
    v_anio = new Date(ultimoDia).getFullYear();

    if(m < 10){
      v_mes = "0" + m;
    } else {
      v_mes = m;
    }

    if(d < 10){
      v_dia = "0" + d;
    } else {
      v_dia = d;
    }

    return v_dia + "-" + v_mes + "-" + v_anio;
  }

  cargarDatos(){
    //cualquier fecha
    var fecha = this.mes_anio + "-24";

    var f_desde = this.getPrimerDia(fecha);
    var f_hasta = this.getUltimoDia(fecha);
    var id = localStorage.getItem("id");
    
    this.turnoService.listar_mis_turnos(id, f_desde, f_hasta).then((data: any) => {
      this.e_turnos = data.recordSet.element;
      //console.log(data.recordSet.element);
    });
  }

}
