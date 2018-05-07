import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';
import { EspecialidadService } from '../../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../../servicios/modulos/medico.services';
import { ConsultorioService } from '../../../servicios/modulos/consultorio.services';
import { HorarioService } from '../../../servicios/modulos/horario.services';

@Component({
  selector: 'turno-atencion-registrar',
  templateUrl: './turno-atencion-registrar.component.html',
  styleUrls: ['./turno-atencion-registrar.component.css']
})
export class TurnoAtencionRegistrarComponent implements OnInit {

  e_especialidad: any;
  e_medico: any;
  e_consultorio: any;
  e_horario: any;

  especialidad:string;
  medico:string;
  fecha:string;
  total_citas:string;
  consultorio:string;
  horario:string;
  
  constructor(
    private turnoAtencionService: TurnoAtencionService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private consultorioService: ConsultorioService,
    private horarioService: HorarioService,
    private router: Router
  ) {
    this.especialidad = "0";
    this.medico = "0";
    this.consultorio = "0";
    this.horario = "0";
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

    this.especialidadService.listar().then((data:any)=>{
      this.e_especialidad = data.recordSet.element;
      //console.log(this.e_especialidad);
    });

    this.cargarMedicos(this.especialidad);

    //VALIDAR MÉTODO
    this.consultorioService.listar_todos().then((data:any)=>{
      this.e_consultorio = data.recordSet.element;
      //console.log(this.e_consultorio);
    });

    //VALIDAR MÉTODO
    this.horarioService.listar().then((data:any)=>{
      this.e_horario = data.recordSet.element;
      //console.log(this.e_horario);
    });

    this.fecha = this.fecha_actual();
    this.total_citas = "15";
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

  registrar(){
    this.turnoAtencionService.registrar(this.fecha, this.total_citas, this.medico, this.consultorio, this.horario)
    .then((data) =>{
      //console.log(data);
      this.router.navigate(['/modulos/turno-atencion']);
    })
    .catch((error) => {
      console.log(error);
    });

    //console.log(this.especialidad);
    //console.log(this.medico);
    //console.log(this.consultorio);
    //console.log(this.horario);
  }

  gotoTurno(){
    this.router.navigate(['/modulos/turno-atencion']);
  }
  
}
