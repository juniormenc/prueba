import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SettingsService } from '../../../servicios/global/settings.service';

import { HorarioService } from '../../../servicios/modulos/horario.services';

@Component({
  selector: 'app-horario-registrar',
  templateUrl: './horario-registrar.component.html',
  styleUrls: ['./horario-registrar.component.scss']
})
export class HorarioRegistrarComponent implements OnInit {

  hora_entrada: string;
  hora_salida: string;

  constructor(private router: Router, private settingsService: SettingsService, public horarioService:HorarioService) { }

  ngOnInit() {
    
  }

  registrar(){
    this.horarioService.registrar(this.hora_entrada, this.hora_salida)
    .then((data) =>{
      //console.log(data);
      this.router.navigate(['/modulos/horario']);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  regresar(){
    this.router.navigate(['modulos/horario']);
  }
}
