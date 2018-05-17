import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {PacienteService} from '../../../servicios/modulos/paciente.services';
import {Router} from '@angular/router';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'paciente-registrar',
  templateUrl: './paciente-registrar.component.html',
  styleUrls: ['./paciente-registrar.component.css']
})
export class PacienteRegistrarComponent implements OnInit {

  id: number;
  dni: string;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  sexo: number;
  domicilio: string;
  estado_civil: number;
  profesion: string;
  tipo_sangre: number;
  nombre_sexo: string;
  email: string;
  celular: string;
  
  constructor(private pacienteService: PacienteService, private settingsService: SettingsService, private router: Router) {
   }

  ngOnInit() {
    
  }

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return dia + "-" + mes + "-" + anio;
  }

  registrar(){

    var bandera = false;

    //VALIDANDO FECHA DE NACIMIENTO
    if(this.fecha_nacimiento != null){
      var f_nacimiento = this.validar_fecha(this.fecha_nacimiento);
    }

    this.pacienteService.registrar(this.dni, this.nombres, this.ap_paterno, this.ap_materno, f_nacimiento, this.sexo, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular)
    .then((data) =>{
      this.id = data.recordSet.element[0].ins_paciente;
      bandera = true;

      if(bandera == true){
        this.pacienteService.registrar_antecedentes(this.id)
        .then((data) =>{
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      this.router.navigate(['/modulos/paciente']);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  gotoPaciente(){
    this.router.navigate(['/modulos/paciente']);
  }

}
