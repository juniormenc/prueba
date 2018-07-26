import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'reporte-ingresos-citas',
  templateUrl: './reporte-ingresos-citas.component.html',
  styleUrls: ['./reporte-ingresos-citas.component.scss']
})
export class ReporteIngresosCitasComponent implements OnInit {

  loading: boolean;

  e_citas: Array<any>;
  cantidad_citas: any;
  ingreso_citas: any;

  fecha_desde: any;
  fecha_hasta: any;

  constructor(private citaService: CitaService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  downloadPDF(){

    //CABECERA
    var header = ["FECHA", "N° CITAS", "TOTAL (S/.)", "MÉDICO"];
    
    //DATA
    var data = [];
    for (let i = 0; i < this.e_citas.length; i++) {
       data[i] = [this.e_citas[i].fecha, this.e_citas[i].cantidad_citas, this.e_citas[i].costo_final, this.e_citas[i].nombre_medico];
    }

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("REPORTE DE INGRESOS DE CITAS", 165, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text("Fecha: " + this.fecha_desde + " - " + this.fecha_hasta, 50, 90);
    doc.text("Total de Citas: "+this.cantidad_citas, 50, 110);
    
    doc.setFontType("bold");
    doc.text("Ingresos: S./ "+this.ingreso_citas, 50, 130);

    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 150},
      
    });

    /*let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };*/

    //let content = this.content.nativeElement;
    /*doc.fromHTML(content.innerHTML, 15, 55, {
      'width': 522,
      'elementHandlers': specialElementHandlers
    });*/

    doc.save("ing-citas-"+this.fecha_desde+"-"+this.fecha_hasta+".pdf");
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
    this.fecha_desde = this.fecha_actual();
    this.fecha_hasta = this.fecha_actual();
    this.cargarDatos();
  }

  cargarDatos(){
    
    var f_desde = this.validar_fecha(this.fecha_desde);
    var f_hasta = this.validar_fecha(this.fecha_hasta)

    this.loading = true;
    this.e_citas = null;

    this.citaService.listar_ingresos_citas(f_desde, f_hasta).then((data: any) => {
      this.e_citas = data.recordSet.element;
      //console.log(data.recordSet.element);
      this.loading = false;
    });

    this.citaService.listar_suma_ingresos_citas(f_desde, f_hasta).then((data: any) => {
      this.ingreso_citas = data.recordSet.element.ingreso;
      this.cantidad_citas = data.recordSet.element.cantidad;
      //console.log(data.recordSet.element);
    });

  }
  
}
