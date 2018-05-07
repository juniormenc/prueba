import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';
import { EspecialidadService } from '../../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../../servicios/modulos/medico.services';

@Component({
  selector: 'reporte-turnos-medico',
  templateUrl: './reporte-turnos-medico.component.html',
  styleUrls: ['./reporte-turnos-medico.component.scss']
})
export class ReporteTurnosMedicoComponent implements OnInit {

  e_especialidad: any;
  e_medico: any;
  e_turno:any;

  especialidad:string;
  medico:string;
  fecha:string;

  constructor(
    private turnoService: TurnoAtencionService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private router: Router
  ) { }

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

    this.especialidad = "0";

    this.especialidadService.listar().then((data:any)=>{
      this.e_especialidad = data.recordSet.element;
      //console.log(this.e_especialidad);
    });

    this.cargarMedicos(this.especialidad);

    this.fecha = this.fecha_actual();
  }

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return dia + "-" + mes + "-" + anio;
  }

  cargarMedicos(id){
    this.e_medico = [];
    this.especialidad = id;
    this.medico = "0";

    //Listar Médicos según la Especialidad
    this.medicoService.listar_por_especialidad(id).then((data:any)=>{
      this.e_medico = data.recordSet.element;
      //console.log(this.e_medico);
    });
  }

  cargarDatos(){
    
    var f_desde = this.validar_fecha(this.fecha_actual());
    var f_hasta = this.validar_fecha(this.fecha)

    if(parseInt(this.especialidad) > 0) {
      this.turnoService.reporte_turno_por_medico(parseInt(this.medico), f_desde, f_hasta).then((data:any)=>{
        this.e_turno = data.recordSet.element;
        //console.log(this.e_turno);
      });
    }

  }

}
