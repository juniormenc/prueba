import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { ConsultorioService } from '../../../servicios/modulos/consultorio.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'consultorio-registrar',
  templateUrl: './consultorio-registrar.component.html',
  styleUrls: ['./consultorio-registrar.component.css']
})
export class ConsultorioRegistrarComponent implements OnInit {

  numero:string;
 
  constructor(private consultorioService: ConsultorioService, private settingsService: SettingsService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    
  }

  registrar(){
    if (this.numero == null ||  this.numero == "") {
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
    }else{

      this.consultorioService.registrar(this.numero)
      .then((data) =>{
        //console.log(data);
        this.router.navigate(['/modulos/consultorio']);
        this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  gotoConsultorio(){
    this.router.navigate(['/modulos/consultorio']);
  }

}
