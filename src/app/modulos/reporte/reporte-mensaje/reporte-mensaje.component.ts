import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { MensajeService } from '../../../servicios/modulos/mensaje.services';

@Component({
  selector: 'reporte-turnos-medico',
  templateUrl: './reporte-mensaje.component.html',
  styleUrls: ['./reporte-mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  loading: boolean;

  e_mensaje: any;
  est_mensaje: boolean;

  constructor(
    private mensajeService: MensajeService,
    private router: Router
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  /*
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

  */

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

    this.loading = true;

    this.mensajeService.listar_mensajes_por_atender().then(data => {
      this.e_mensaje = data.recordSet.element;
      this.loading = false;
      //console.log(this.e_mensaje)
    });
    
  }

  atendido(id){
    this.e_mensaje = null;
    this.loading = true;
    this.mensajeService.inhabilitar_mensaje(id).then(data => {
      this.mensajeService.listar_mensajes_por_atender().then(data => {
        this.e_mensaje = data.recordSet.element;
        //console.log(this.e_mensaje)
        this.loading = false;
      });
    });
  }

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return anio + "-" + mes + "-" + dia;
  }

}
