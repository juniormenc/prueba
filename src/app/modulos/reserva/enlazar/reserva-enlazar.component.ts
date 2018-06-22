import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';
import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'reserva-enlazar',
  templateUrl: './reserva-enlazar.component.html',
  styleUrls: ['./reserva-enlazar.component.scss']
})
export class ReservaEnlazarComponent implements OnInit {

  loading: boolean;

  displayCP = 'none';
  displayE = 'none';
  paciente: Array<any>;

  //paciente
  id_re: number;
  id_pa:number;
  dni:string;
  nombres:string;
  ap_paterno:string;
  ap_materno:string;
  fecha_nacimiento: string;
  sexo:number;
  domicilio: string;
  estado_civil: number;
  profesion: string;
  tipo_sangre: number;
  nombre_sexo: string;
  email:string;
  celular:string;

  //cita
  fecha: string;
  horario: string;
  especialidad: string;
  medico: string;
  consultorio: string;
  costo: string;

  //hidden
  h_mensaje: boolean = true;
  h_btn_nuevo_pac: boolean = true;
  h_nuevo_pac: boolean = true;
  h_crear: boolean = true;
  h_enlazar: boolean = true;

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {  }

  ngOnInit() {

    this.loading = true;

    this.cargarDatosReserva();

    this.route.params.subscribe(params => {
      this.id_re = params['id'];
      this.dni = params['dni'];
    });

    this.pacienteService.detalle_dni(this.dni).then((data:any)=>{
      //console.log(data.recordSet.element);
      if(data.recordSet.element == null){
        //console.log('vacío');
        this.paciente = [];
        this.h_mensaje = true;
        this.h_btn_nuevo_pac = true;
        this.h_nuevo_pac = true;
        this.h_crear = false;
        this.h_enlazar = true;

        var f_nacimiento = this.validar_fecha("21/06/2018");
        this.fecha_nacimiento = f_nacimiento;
      }else{

        this.paciente = data.recordSet.element;
        this.h_mensaje = false;
        this.h_btn_nuevo_pac = false;
        this.h_nuevo_pac = false;
        this.h_crear = true;
        this.h_enlazar = false;

        var f_nacimiento = this.validar_fecha(data.recordSet.element.fecha_nacimiento);

        this.id_pa = data.recordSet.element.id;
        this.nombres = data.recordSet.element.nombre;
        this.ap_materno = data.recordSet.element.apellido_materno;
        this.ap_paterno = data.recordSet.element.apellido_paterno;
        this.fecha_nacimiento = f_nacimiento;
        this.sexo = data.recordSet.element.sexo;
        this.domicilio = data.recordSet.element.domicilio;
        this.estado_civil = data.recordSet.element.estado_civil;
        this.profesion = data.recordSet.element.profesion;
        this.tipo_sangre = data.recordSet.element.tipo_sangre;
        this.email = data.recordSet.element.correo;
        this.celular = data.recordSet.element.celular;

      }

      this.loading = false;

    })
  }

  cargarDatosReserva(){
    this.fecha = localStorage.getItem("fecha");
    this.horario = localStorage.getItem("horario");
    this.especialidad = localStorage.getItem("especialidad");
    this.medico = localStorage.getItem("medico");
    this.consultorio = localStorage.getItem("consultorio");
    this.costo = localStorage.getItem("costo");
  }

  limpiar_localstorage(){
    localStorage.removeItem('fecha');
    localStorage.removeItem('horario');
    localStorage.removeItem('especialidad');
    localStorage.removeItem('medico');
    localStorage.removeItem('consultorio');
    localStorage.removeItem('costo');
  }

  limpiar(){
    this.h_mensaje = true;
    this.h_btn_nuevo_pac = true;
    this.h_nuevo_pac = true;
    this.h_crear = false;
    this.h_enlazar = true;

    var f_nacimiento = this.validar_fecha("21/06/2018");

    this.id_pa = null;
    this.nombres = null;
    this.ap_materno = null;
    this.ap_paterno = null;
    this.fecha_nacimiento = f_nacimiento;
    this.sexo = 0;
    this.domicilio = null;
    this.estado_civil = 0;
    this.profesion = null;
    this.tipo_sangre = 0;
    this.email = null;
    this.celular = null;
  }

  validar_fecha(fecha){
    var dia = fecha.substr(0,2);
    var mes = fecha.substr(3,2);
    var anio = fecha.substr(6,4);
    
    return anio + "-" + mes + "-" + dia;
  }

  validar_fecha_registrar(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return anio + "-" + mes + "-" + dia;
  }

  goToCrear(id){
    this.displayCP='block';
    this.limpiar_localstorage();
  }

  goToEnlazar(id){
    this.displayE='block';
    this.limpiar_localstorage();
  }

  onCloseHandled(){
    this.displayCP='none';
    this.displayE='none';
  }

  goToReservasPendientes(){
    this.router.navigate(['/modulos/reserva']);
  }

  enlazar(){
    this.citaService.enlazar(this.id_re, this.id_pa).then((data:any) => {
      console.log(data);
    });
    
    this.settingsService.showNotification('top','right', this.settingsService.mensaje.enlazar, 2);
    this.onCloseHandled();
    this.h_btn_nuevo_pac = true;
    this.h_crear = true;
    this.h_enlazar = true;
    this.h_mensaje = true;
  }

  crear(){
    
    var bandera = false;

    //VALIDANDO FECHA DE NACIMIENTO
    if(this.fecha_nacimiento != null){
      var f_nacimiento = this.validar_fecha_registrar(this.fecha_nacimiento);
      console.log(f_nacimiento)
    }

    this.pacienteService.registrar(this.dni, this.nombres, this.ap_paterno, this.ap_materno, f_nacimiento, this.sexo, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular)
    .then((data) =>{
      console.log(data);
      this.id_pa = data.recordSet.element[0].ins_paciente;
      bandera = true;

      if(bandera == true){
        this.pacienteService.registrar_antecedentes(this.id_pa)
        .then((data) =>{
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

        this.enlazar();
        this.onCloseHandled();
      }
      
    })
    .catch((error) => {
      console.log(error);
    });

    
  }
}
