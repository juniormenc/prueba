import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'reporte-citas',
  templateUrl: './reporte-citas.component.html',
  styleUrls: ['./reporte-citas.component.scss']
})
export class ReporteCitasComponent implements OnInit {
  
  e_citas: Array<any>;

  fecha_hasta: any;

  constructor(private citaService: CitaService) { }

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

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return dia + "-" + mes + "-" + anio;
  }

  ngOnInit() {
    this.fecha_hasta = this.fecha_actual();
    this.cargarDatos();
  }

  cargarDatos(){
    
    var f_hoy = this.validar_fecha(this.fecha_actual());
    var f_hasta = this.validar_fecha(this.fecha_hasta)

    this.citaService.listar_citas_por_fecha(f_hoy, f_hasta).then((data: any) => {
      this.e_citas = data.recordSet.element;
      //console.log(data.recordSet.element);
    });

  }
  
}
