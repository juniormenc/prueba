import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'reporte-reservas',
  templateUrl: './reporte-reservas.component.html',
  styleUrls: ['./reporte-reservas.component.scss']
})
export class ReporteReservasComponent implements OnInit {

  loading: boolean;

  e_reservas: Array<any>;

  fecha_hasta: any;

  constructor(private citaService: CitaService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  downloadPDF(){

    //CABECERA
    var header = ["FECHA", "HORARIO", "PACIENTE", "MÉDICO"];
    
    //DATA
    var data = [];
    for (let i = 0; i < this.e_reservas.length; i++) {
       data[i] = [this.e_reservas[i].fecha, this.e_reservas[i].horario, this.e_reservas[i].nombre_paciente, this.e_reservas[i].nombre_medico];
    }

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("REPORTE DE RESERVAS PENDIENTES", 165, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text("Fecha: " + this.fecha_actual() + " - " + this.fecha_hasta, 50, 100);

    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 120},
      
    });

    doc.save("res-"+this.fecha_actual()+"-"+this.fecha_hasta+".pdf");
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

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return anio + "-" + mes + "-" + dia;
  }

  ngOnInit() {
    this.fecha_hasta = this.fecha_actual();
    this.cargarDatos();
  }

  cargarDatos(){
    
    var f_hoy = this.validar_fecha(this.fecha_actual());
    var f_hasta = this.validar_fecha(this.fecha_hasta)

    this.e_reservas = null;
    this.loading = true;

    this.citaService.listar_reservas_por_fecha(f_hoy, f_hasta).then((data: any) => {
      this.e_reservas = data.recordSet.element;
      //console.log(data.recordSet.element);
      this.loading = false;
    });

  }

}
