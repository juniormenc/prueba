import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';
import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';

@Component({
  selector: 'cita-paciente-listar',
  templateUrl: './cita-paciente-listar.component.html',
  styleUrls: ['./cita-paciente-listar.component.scss']
})

export class CitaPacienteListarComponent implements OnInit {

  loading: boolean;

  e_pacientes: Array<any>;
  e_turnos: Array<any>;
  turno_id: any;
  id: any;

  constructor(
    private citaService: CitaService,
    private turnoAtencionService: TurnoAtencionService,
    private router: Router
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {

    this.id = localStorage.getItem('id');
    this.turno_id = 0;

    this.loading = true;
    this.e_pacientes = null;
    this.e_turnos = null;

    this.listarTurnosMedico();
  }

  listarCitasHoy(){
    this.citaService.listar_citas_hoy(this.id, this.turno_id, this.fecha_actual()).then((data:any) => {
      this.e_pacientes = data.recordSet.element;
      //console.log(this.e_pacientes);
      this.loading = false;
    });
  }

  listarTurnosMedico(){

    this.loading = true;
    this.e_turnos = null;

    this.turnoAtencionService.listar_todos_hoy_segun_medico(this.id, this.fecha_actual()).then((data: any) =>{
      this.e_turnos = data.recordSet.element;
      //console.log(this.e_turnos)
      this.loading = false;
    });
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

  gotoHistoria(id, paciente_id){
    this.router.navigate(['modulos/cita-paciente/registrar', id, paciente_id]);
  }
}
