import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'reporte-historias-paciente',
  templateUrl: './reporte-historias-paciente.component.html',
  styleUrls: ['./reporte-historias-paciente.component.scss']
})
export class ReporteHistoriasPacienteComponent implements OnInit {

  e_pacientes: Array<any>;
  e_cita: Array<any>;
  
  displayHC = 'none';

  dni:string;
  paciente:string;
  fecha_nacimiento: string;
  edad: number;
  sexo:number;
  domicilio: string;
  estado_civil: number;
  profesion: string;
  tipo_sangre: number;
  nombre_sexo: string;
  email:string;
  celular:string;

  ant_id:number;
  ant_madre: string;
  ant_padre: string;
  ant_hermanos: string;
  ant_hijos: string;
  ant_otros_familiares: string;
  ant_alcohol: number;
  ant_tabaco: number;
  ant_droga: number;
  ant_observaciones_toxicologicas: string;
  ant_hospitalizaciones: number;
  ant_infartos: number;
  ant_intervenciones: number;
  ant_alergenos: number;
  ant_farmacos_consume: string;
  ant_enfermedades_padece: string;
  ant_enfermedades_padecio: string;
  ant_otros_antecedentes: string;

  constructor(public pacienteService: PacienteService, public citaService: CitaService) { }

  goToHC(id, apellido_paterno, apellido_materno, nombres){

    this.pacienteService.detalle(parseInt(id)).then((data:any)=>{
      //console.log(data.recordSet.element);

      this.dni = data.recordSet.element.dni;
      this.paciente = data.recordSet.element.apellido_paterno + " " + data.recordSet.element.apellido_materno + ", " + data.recordSet.element.nombre;
      this.fecha_nacimiento = data.recordSet.element.fecha_nacimiento;
      this.edad = data.recordSet.element.edad;
      this.sexo = data.recordSet.element.sexo;
      this.domicilio = data.recordSet.element.domicilio;
      this.estado_civil = data.recordSet.element.estado_civil;
      this.profesion = data.recordSet.element.profesion;
      this.tipo_sangre = data.recordSet.element.tipo_sangre;
      this.email = data.recordSet.element.correo;
      this.celular = data.recordSet.element.celular;
    });

    this.pacienteService.listar_antecedentes_por_paciente(parseInt(id)).then((data:any)=>{
      //console.log(data.recordSet.element);

      this.ant_madre = data.recordSet.element.ant_madre;
      this.ant_padre = data.recordSet.element.ant_padre;
      this.ant_hermanos = data.recordSet.element.ant_hermanos;
      this.ant_hijos = data.recordSet.element.ant_hijos;
      this.ant_otros_familiares = data.recordSet.element.ant_otros_familiares;
      this.ant_alcohol = data.recordSet.element.ant_alcohol;
      this.ant_tabaco = data.recordSet.element.ant_tabaco;
      this.ant_droga = data.recordSet.element.ant_droga;
      this.ant_observaciones_toxicologicas = data.recordSet.element.ant_observaciones_toxicologicas;
      this.ant_hospitalizaciones = data.recordSet.element.ant_hospitalizaciones;
      this.ant_infartos = data.recordSet.element.ant_infartos;
      this.ant_intervenciones = data.recordSet.element.ant_intervenciones;
      this.ant_alergenos = data.recordSet.element.ant_alergenos;
      this.ant_farmacos_consume = data.recordSet.element.ant_farmacos_consume;
      this.ant_enfermedades_padece = data.recordSet.element.ant_enfermedades_padece;
      this.ant_enfermedades_padecio = data.recordSet.element.ant_enfermedades_padecio;
      this.ant_otros_antecedentes = data.recordSet.element.ant_otros_antecedentes;
    });

    this.citaService.listar_historial_citas_por_paciente(id).then((data: any) =>{
      this.e_cita = data.recordSet.element;
      //console.log(this.e_cita)
    });

    this.displayHC='block';
  }

  onCloseHandled(){
    this.displayHC='none';
  }

  downloadPDF(){

    var header = ["FECHA", "SIGNOS", "SÍNTOMAS", "DIAGNÓSTICO", "RECETA/TRATAMIENTO"];
    
    //DATA
    var data = [];
    for (let i = 0; i < this.e_cita.length; i++) {
      data[i] = [this.e_cita[i].fecha, this.e_cita[i].signos, this.e_cita[i].sintomas, this.e_cita[i].diagnostico_medico, this.e_cita[i].receta_tratamiento_medico];
    }

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(15);
    doc.text("HISTORIA CLÍNICA", 220, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("DATOS GENERALES", 50, 90);

    doc.setFontSize(11);
    doc.text("DNI:", 50, 110);
    doc.setFontType("normal");
    doc.text(this.dni, 140, 110);

    doc.setFontType("bold");
    doc.text("Paciente:", 250, 110);
    doc.setFontType("normal");
    doc.text(this.paciente, 320, 110);

    doc.setFontType("bold");
    doc.text("Sexo:", 50, 130);
    doc.setFontType("normal");
    doc.text(this.sexo, 140, 130);

    doc.setFontType("bold");
    doc.text("Domicilio:", 250, 130);
    doc.setFontType("normal");
    doc.text(this.domicilio, 320, 130);

    doc.setFontType("bold");
    doc.text("F.Nacimiento:", 50, 150);
    doc.setFontType("normal");
    doc.text(this.fecha_nacimiento, 140, 150);

    doc.setFontType("bold");
    doc.text("Edad:", 250, 150);
    doc.setFontType("normal");
    doc.text(this.edad, 320, 150);

    doc.setFontType("bold");
    doc.text("Est. Civil:", 50, 170);
    doc.setFontType("normal");
    doc.text(this.estado_civil, 140, 170);

    doc.setFontType("bold");
    doc.text("Profesión:", 250, 170);
    doc.setFontType("normal");
    doc.text(this.profesion, 320, 170);

    doc.setFontType("bold");
    doc.text("T.Sangre:", 50, 190);
    doc.setFontType("normal");
    doc.text(this.tipo_sangre, 140, 190);

    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("ANTECEDENTES FAMILIARES", 50, 220);

    doc.setFontSize(11);
    doc.text("Ant. Madre:", 50, 240);
    doc.setFontType("normal");
    doc.text(this.ant_madre, 50, 260);

    doc.setFontType("bold");
    doc.text("Ant. Padre:", 50, 280);
    doc.setFontType("normal");
    doc.text(this.ant_padre, 50, 300);

    doc.setFontType("bold");
    doc.text("Ant. Hermanos:", 50, 320);
    doc.setFontType("normal");
    doc.text(this.ant_hermanos, 50, 340);

    doc.setFontType("bold");
    doc.text("Ant. Hijos:", 50, 360);
    doc.setFontType("normal");
    doc.text(this.ant_hijos, 50, 380);

    doc.setFontType("bold");
    doc.text("Otros Ant. Familiares:", 50, 400);
    doc.setFontType("normal");
    doc.text(this.ant_otros_familiares, 50, 420);

    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("ANTECEDENTES TOXICOLÓGICOS", 50, 450);

    doc.setFontSize(11);
    doc.text("Consume Alcohol:", 50, 470);
    doc.setFontType("normal");
    doc.text(this.ant_alcohol, 170, 470);

    doc.setFontType("bold");
    doc.text("Consume Tabaco:", 210, 470);
    doc.setFontType("normal");
    doc.text(this.ant_tabaco, 330, 470);

    doc.setFontType("bold");
    doc.text("Consume Drogas:", 370, 470);
    doc.setFontType("normal");
    doc.text(this.ant_droga, 490, 470);

    doc.setFontType("bold");
    doc.text("Obs. Toxicológicas:", 50, 490);
    doc.setFontType("normal");
    doc.text(this.ant_observaciones_toxicologicas, 50, 510);

    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("ANTECEDENTES GENERALES", 50, 540);

    doc.setFontSize(11);
    doc.text("Hospitalizaciones:", 50, 560);
    doc.setFontType("normal");
    doc.text(""+this.ant_hospitalizaciones, 170, 560);

    doc.setFontType("bold");
    doc.text("Infartos:", 210, 560);
    doc.setFontType("normal");
    doc.text(""+this.ant_infartos, 330, 560);

    doc.setFontType("bold");
    doc.text("Intervenciones:", 370, 560);
    doc.setFontType("normal");
    doc.text(""+this.ant_intervenciones, 490, 560);

    doc.setFontType("bold");
    doc.text("Alergenos:", 50, 580);
    doc.setFontType("normal");
    doc.text(this.ant_alergenos, 50, 600);

    doc.setFontType("bold");
    doc.text("Fármaco(s) que consume:", 50, 620);
    doc.setFontType("normal");
    doc.text(this.ant_farmacos_consume, 50, 640);

    doc.setFontType("bold");
    doc.text("Enfermedad(es) que padece:", 50, 660);
    doc.setFontType("normal");
    doc.text(this.ant_enfermedades_padece, 50, 680);

    doc.setFontType("bold");
    doc.text("Enfermedades que padeció:", 50, 700);
    doc.setFontType("normal");
    doc.text(this.ant_enfermedades_padecio, 50, 720);

    doc.setFontType("bold");
    doc.text("Otros Antecedentes:", 50, 740);
    doc.setFontType("normal");
    doc.text(this.ant_otros_antecedentes, 50, 760);

    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.addPage();

    doc.text("EPISODIOS", 50, 60);

    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 80},
      
    });

    doc.save("hc-"+this.dni+".pdf");
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
