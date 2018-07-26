import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
//import { SpinerComponent } from '../../../recursos/spinner/spinner.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { ConsultorioService } from '../../../servicios/modulos/consultorio.services';


@Component({
  selector: 'consultorio-listar',
  templateUrl: './consultorio-listar.component.html',
  styleUrls: ['./consultorio-listar.component.css']
})
export class ConsultorioListarComponent implements OnInit {

  loading: boolean;

  elemento: Array<any>;
  color: any;

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 0){
      this.listar(valor);
    }else{
      this.listar_todos();
    }
  }

  constructor(private consultorioService: ConsultorioService, private router: Router) {
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

    this.consultorioService.listar_todos().then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  listar(filtro){

    this.loading = true;
    this.elemento = null;

    this.consultorioService.listar(filtro).then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  gotoRegistrar(){
    this.router.navigate(['modulos/consultorio/registrar']);
  }

  gotoEditar(id:number){
    //console.log(id);
    this.router.navigate(['modulos/consultorio/editar',id]);
  }

  /*cambiarEstado(id, estado){
    
    var v_estado = estado;

    if(estado){
      v_estado = false;
      this.color[id-1] = "btn-rojo";
    }else{
      v_estado = true;
      this.color[id-1] = "btn-verde";
    }

    console.log(v_estado);

    this.consultorioService.cambiar_estado(id, v_estado)
    .then((data) =>{
      console.log(data);
    //  this.router.navigate(['/modulos/consultorio']);
    })
    .catch((error) => {
      console.log(error);
    });
  }*/

}
