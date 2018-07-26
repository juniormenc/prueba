import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'cita-paciente-listar',
  templateUrl: './cita-paciente-listar.component.html',
  styleUrls: ['./cita-paciente-listar.component.scss']
})

export class CitaPacienteListarComponent implements OnInit {

  loading: boolean;

  e_pacientes: Array<any>;
  id: any;

  constructor(private citaService: CitaService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {

    this.id = localStorage.getItem('id');

    this.loading = true;
    this.e_pacientes = null;

    this.citaService.listar_citas_hoy(this.id).then((data:any) => {
      this.e_pacientes = data.recordSet.element;
      //console.log(this.e_pacientes);
      this.loading = false;
    });
  }

  gotoHistoria(id, paciente_id){
    this.router.navigate(['modulos/cita-paciente/registrar', id, paciente_id]);
  }
}
