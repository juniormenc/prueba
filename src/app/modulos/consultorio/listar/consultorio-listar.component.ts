import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    
    if(valor.length > 1){
      this.listar(valor);
    }else{
      if (valor.length == 0) {
        this.listar_todos();
      }
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

}
