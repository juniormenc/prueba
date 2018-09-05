import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SettingsService } from '../../../servicios/global/settings.service';
import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';
import { EspecialidadService } from '../../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../../servicios/modulos/medico.services';
import { ConsultorioService } from '../../../servicios/modulos/consultorio.services';
import { HorarioService } from '../../../servicios/modulos/horario.services';


@Component({
  selector: 'turno-atencion-editar',
  templateUrl: './turno-atencion-editar.component.html',
  styleUrls: ['./turno-atencion-editar.component.css']
})
export class TurnoAtencionEditarComponent implements OnInit {

  e_especialidad: any;
  e_medico: any;
  e_consultorio: any;
  e_horario: any;

  id:number;
  especialidad:string;
  medico:string;
  v_fecha: string;
  fecha:string;
  total_citas:string;
  consultorio:string;
  horario:string;

  constructor(
    private turnoAtencionService: TurnoAtencionService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private consultorioService: ConsultorioService,
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    
    //Obtenemos el id de la ruta
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.especialidadService.listar().then((data:any)=>{
      this.e_especialidad = data.recordSet.element;
      //console.log(this.e_especialidad);
    });

    //VALIDAR MÉTODO
    this.consultorioService.listar_todos().then((data:any)=>{
      this.e_consultorio = data.recordSet.element;
      //console.log(this.e_consultorio);
    });

    //VALIDAR MÉTODO
    this.horarioService.listar().then((data:any)=>{
      this.e_horario = data.recordSet.element;
      //console.log(this.e_horario);
    });

    //Cargamos la data en los inputs
    this.turnoAtencionService.detalle(this.id).then((data:any)=>{
      this.especialidad = data.recordSet.element.especialidad_id;
      
      this.cargarMedicos(this.especialidad);
      this.medico = data.recordSet.element.usuario_id;
      
      var f_ = data.recordSet.element.fecha_turno;
      this.fecha = f_;
      
      this.total_citas = data.recordSet.element.total_citas;
      this.consultorio = data.recordSet.element.consultorio_id;
      this.horario = data.recordSet.element.horario_id;
    });

  }

  cargarMedicos(id){
    this.e_medico = [];
    this.especialidad = id;
    this.medico = "0";

    //Listar Médicos según la Especialidad
    this.medicoService.listar_por_especialidad(id).then((data:any)=>{
      this.e_medico = data.recordSet.element;
      //console.log(this.e_medico);
    });
  }

  validar_fecha(fecha){
    var dia = fecha.substr(0,2);
    var mes = fecha.substr(3,2);
    var anio = fecha.substr(6,4);
    
    return anio + "-" + mes + "-" + dia;
  }

  validar_fecha_guardar(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return dia + "-" + mes + "-" + anio;
  }

  modificar(){
    if(this.fecha != null){
      var f_turno = this.validar_fecha_guardar(this.fecha);
    }

    if (this.especialidad == "0" || this.especialidad == null) {
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
    } else {
      if (this.medico == "0" || this.medico == null) {
        this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
      } else {
        if (this.fecha == "" || this.fecha == null) {
          this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
        } else {
          if (this.total_citas == "" || this.total_citas == null) {
            this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
          } else {
            if (this.consultorio == "0" || this.consultorio == null) {
              this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
            } else {
              if (this.horario == "0" || this.horario == null) {
                this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
              } else {
                this.turnoAtencionService.modificar(this.id, f_turno, this.total_citas, this.medico, this.consultorio, this.horario)
                .then((data) =>{
                  //console.log(data);
                  this.router.navigate(['/modulos/turno-atencion']);
                  this.settingsService.showNotification('top','right', this.settingsService.mensaje.modificar, 3);
                })
                .catch((error) =>{
                  console.log(error);
                })
              } 
            }
          }
        }
      }
    }

    /*
    console.log(this.id);
    console.log(f_turno);
    console.log(this.total_citas);
    console.log(this.medico);
    console.log(this.consultorio);
    console.log(this.horario);
    */
    
  }


  gotoTurno(){
    this.router.navigate(['/modulos/turno-atencion']);
  }
  
}
