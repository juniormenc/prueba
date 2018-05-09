import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { PacienteService } from '../../../servicios/modulos/paciente.services';

@Component({
  selector: 'reporte-historias-paciente',
  templateUrl: './reporte-historias-paciente.component.html',
  styleUrls: ['./reporte-historias-paciente.component.scss']
})
export class ReporteHistoriasPacienteComponent implements OnInit {

  e_pacientes: Array<any>;

  constructor(public pacienteService: PacienteService) { }

  downloadPDF(id){

    //CABECERA
    var header = ["FECHA", "HORARIO", "PACIENTE", "MÉDICO"];
    
    //DATA
    var data = [];
    /*for (let i = 0; i < this.e_citas.length; i++) {
       data[i] = [this.e_citas[i].fecha, this.e_citas[i].hora_entrada + "-" + this.e_citas[i].hora_salida, this.e_citas[i].nombre_paciente, this.e_citas[i].nombre_medico];
    }*/

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("HISTORIA CLÍNICA", 165, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("normal");
    //doc.text("Paciente: " + this.datos_paciente, 50, 100);
    //doc.text("Paciente: " + this.ante_paciente, 50, 100);
    //doc.text("Paciente: " + this.atenci_paciente, 50, 100);

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

    //doc.save("historia-"+this.dni+".pdf");
  }

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 0){
      this.listar(valor);
    }else{
      this.listar_todos();
    }
  }
  
  ngOnInit() {
    this.listar_todos();
  }

  listar_todos(){
    this.pacienteService.listar_todos().then((data: any) =>{
      this.e_pacientes = data.recordSet.element;
      //console.log(this.e_pacientes)
    });
  }

  listar(filtro){
    this.pacienteService.listar(filtro).then((data: any) =>{
      this.e_pacientes = data.recordSet.element;
      //console.log(this.elemento)
    });
  }

}
