import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { PacienteService } from '../../../servicios/modulos/paciente.services';

@Component({
  selector: 'reporte-historias-paciente',
  templateUrl: './reporte-historias-paciente.component.html',
  styleUrls: ['./reporte-historias-paciente.component.scss']
})
export class ReporteHistoriasPacienteComponent implements OnInit {

  e_pacientes: Array<any>;

  constructor(public pacienteService: PacienteService) { }

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
      //console.log(this.elemento)
    });
  }

  listar(filtro){
    this.pacienteService.listar(filtro).then((data: any) =>{
      this.e_pacientes = data.recordSet.element;
      //console.log(this.elemento)
    });
  }

}
