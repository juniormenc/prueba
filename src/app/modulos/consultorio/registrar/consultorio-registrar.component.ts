import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {ConsultorioService} from '../../../servicios/modulos/consultorio.services';
import {Router} from '@angular/router';

@Component({
  selector: 'consultorio-registrar',
  templateUrl: './consultorio-registrar.component.html',
  styleUrls: ['./consultorio-registrar.component.css']
})
export class ConsultorioRegistrarComponent implements OnInit {

  numero:string;
 
  constructor(private consultorioService: ConsultorioService, private router: Router) {
   }

  ngOnInit() {
    
  }

  registrar(){
    this.consultorioService.registrar(this.numero)
    .then((data) =>{
      //console.log(data);
      this.router.navigate(['/modulos/consultorio']);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  gotoConsultorio(){
    this.router.navigate(['/modulos/consultorio']);
  }

}
