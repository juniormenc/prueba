import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../servicios/global/settings.service';

import { HorarioService } from '../../../servicios/modulos/horario.services';

@Component({
  selector: 'horario-editar',
  templateUrl: './horario-editar.component.html',
  styleUrls: ['./horario-editar.component.scss']
})
export class HorarioEditarComponent implements OnInit {

  elemento:Array<any>;
  id: number;
  hora_entrada: string;
  hora_salida: string;

  constructor(private router:Router, private route: ActivatedRoute, public horarioService: HorarioService, private settingsService: SettingsService) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    //Obtenemos el id de la ruta
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    

    //Cargamos la data en los inputs
    this.horarioService.detalle(this.id).then((data:any)=>{

      this.hora_entrada = data.recordSet.element.hora_entrada;
      this.hora_salida = data.recordSet.element.hora_salida;
    });
  }

  modificar(){
    if (this.hora_entrada == null || this.hora_salida == null || this.hora_entrada == "" || this.hora_salida == "") {
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
    }else{

      this.horarioService.modificar(this.id, this.hora_entrada, this.hora_salida)
      .then((data) =>{
        //console.log(data);
        this.router.navigate(['/modulos/horario']);
        this.settingsService.showNotification('top','right', this.settingsService.mensaje.modificar, 3);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  regresar(){
    this.router.navigate(['modulos/horario']);
  }
}
