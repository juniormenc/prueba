import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
//import { SpinerComponent } from '../../../recursos/spinner/spinner.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';


@Component({
  selector: 'turno-atencion-listar',
  templateUrl: './turno-atencion-listar.component.html',
  styleUrls: ['./turno-atencion-listar.component.css']
})
export class TurnoAtencionListarComponent implements OnInit {

  loading: boolean;

  elemento: Array<any>;

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 0){
      this.listar(valor);
    }else{
      this.listar_todos();
    }
  }

  constructor(public turnoAtencionService: TurnoAtencionService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.listar_todos();
  }

  listar_todos(){

    this.loading = true;
    this.elemento = null;

    this.turnoAtencionService.listar_todos().then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  listar(filtro){

    this.loading = true;
    this.elemento = null;

    this.turnoAtencionService.listar(filtro).then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  goToRegistrar(){
    this.router.navigate(['modulos/turno-atencion/registrar']);
  }

  gotoEditar(id:number){
    //console.log(id);
    this.router.navigate(['modulos/turno-atencion/editar',id]);
  }

}
