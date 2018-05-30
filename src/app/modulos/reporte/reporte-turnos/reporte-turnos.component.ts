import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';

@Component({
  selector: 'areporte-turnos',
  templateUrl: './reporte-turnos.component.html',
  styleUrls: ['./reporte-turnos.component.scss']
})
export class ReporteTurnosComponent implements OnInit {

  loading: boolean;

  mes_anio: any;
  e_turnos: Array<any>;
  
  constructor(private turnoService: TurnoAtencionService) { }

  downloadPDF(){

    //CABECERA
    var header = ["FECHA", "CONSULTORIO", "HORARIO"];
    
    //DATA
    var data = [];
    for (let i = 0; i < this.e_turnos.length; i++) {
       data[i] = [this.e_turnos[i].fecha_turno, this.e_turnos[i].numero_consultorio, this.e_turnos[i].hora_entrada+" - "+this.e_turnos[i].hora_salida];
    }

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("REPORTE DE MIS TURNOS", 200, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text("AÑO-MES: "+this.mes_anio, 50, 80);
    
    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 100},
      
    });

    doc.save("mis-turnos-"+this.mes_anio+".pdf");
  }

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

    return v_anio + "-" + v_mes + "-" + v_dia;
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

    return v_anio + "-" + v_mes + "-" + v_dia;
  }

  cargarDatos(){
    //cualquier fecha
    var fecha = this.mes_anio + "-24";

    var f_desde = this.getPrimerDia(fecha);
    var f_hasta = this.getUltimoDia(fecha);
    var id = localStorage.getItem("id");

    this.loading = true;
    this.e_turnos = null;
    
    this.turnoService.listar_mis_turnos(id, f_desde, f_hasta).then((data: any) => {
      this.e_turnos = data.recordSet.element;
      //console.log(data.recordSet.element);
      this.loading = false;
    });
  }

}
