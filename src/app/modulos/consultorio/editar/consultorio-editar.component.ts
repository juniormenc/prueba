import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {ConsultorioService} from '../../../servicios/modulos/consultorio.services';
import { Router,ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'consultorio-editar',
  templateUrl: './consultorio-editar.component.html',
  styleUrls: ['./consultorio-editar.component.css']
})
export class ConsultorioEditarComponent implements OnInit {

  id:number;
  numero:string;

  constructor(private consultorioService: ConsultorioService, private route: ActivatedRoute,private router: Router, private settingsService: SettingsService) { }

  ngOnInit() {
    
    //Obtenemos el id de la ruta
      this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    //Cargamos la data en los inputs
    this.consultorioService.detalle(this.id).then((data:any)=>{
      this.numero = data.recordSet.element.numero;
    });
  }

  modificar(){
    this.consultorioService.modificar(this.id,this.numero)
    .then((data) =>{
      //console.log(data);
      this.router.navigate(['/modulos/consultorio']);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.modificar, 3);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  gotoConsultorio(){
    this.router.navigate(['/modulos/consultorio']);
  }

}
