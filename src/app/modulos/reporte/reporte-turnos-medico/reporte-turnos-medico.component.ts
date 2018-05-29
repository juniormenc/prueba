import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

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

  downloadPDF(){

    //CABECERA
    var header = ["FECHA", "HORARIO", "CONSULTORIO"];
    
    //DATA
    var data = [];
    for (let i = 0; i < this.e_turno.length; i++) {
       data[i] = [this.e_turno[i].fecha_turno, this.e_turno[i].hora_entrada+" - "+this.e_turno[i].hora_salida, this.e_turno[i].numero_consultorio];
    }

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("REPORTE DE TURNOS MÉDICOS", 165, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text("Fecha: " + this.fecha_actual() + " - " + this.fecha, 50, 80);
    
    for (let i = 0; i < this.e_especialidad.length; i++) {

      if(this.e_especialidad[i].id == this.especialidad){
        doc.text(this.e_especialidad[i].nombre, 50, 100);
      }
      
    }
    
    for (let i = 0; i < this.e_medico.length; i++) {

      if(this.e_medico[i].id == this.medico){
        doc.setFontType("bold");
        doc.text("Dr(a)." + this.e_medico[i].nombre_medico, 50, 120);
      }
      
    }

    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 140},
      
    });

    doc.save("turn-med-"+this.fecha_actual()+"-"+this.fecha+".pdf");
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
    return anio + "-" + mes + "-" + dia;
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
