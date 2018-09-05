import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';
import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { ExternoService } from '../../../servicios/modulos/externo.services';
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
  tipo_documento: any;
  habilitar_doc_ide; any;
  doc_ide: string;
  nacionalidad_id: any;
  e_nacionalidad: any;
  nombres:string;
  ap_paterno:string;
  ap_materno:string;
  fecha_nacimiento: string;
  sexo:number;
  departamento_dom_id: any;
  e_departamento_dom: number;
  provincia_dom_id: any;
  e_provincia_dom: number;
  distrito_dom_id: any;
  e_distrito_dom: number;
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
  h_nuevo_pac: boolean = true;
  h_crear: boolean = true;
  h_enlazar: boolean = true;

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private externoService: ExternoService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {

    this.tipo_documento = 0;
    this.habilitar_doc_ide = true;
    this.nacionalidad_id = 179;//PERÚ
    this.sexo = 0;
    this.departamento_dom_id = 0;
    this.provincia_dom_id = 0;
    this.distrito_dom_id = 0;
    this.estado_civil = 0;
    this.tipo_sangre = 0;
    this.profesion = "";
    this.email = "";

    //NACIONALIDAD
    this.listarPais();

    this.loading = true;

    this.cargarDatosReserva();

    this.route.params.subscribe(params => {
      this.id_re = params['id'];
      this.doc_ide = params['doc_ide'];
    });

    this.pacienteService.detalle_doc_ide(this.doc_ide).then((data:any)=>{
      //console.log(data.recordSet.element);
      if(data.recordSet.element == null){
        //console.log('vacío');
        this.paciente = [];
        this.h_mensaje = true;
        this.h_nuevo_pac = false;
        this.h_crear = false;
        this.h_enlazar = true;

        this.fecha_nacimiento = f_nacimiento;

        this.listarDepartamento();
        this.listarProvincia();
        this.listarDistrito();

        this.celular = localStorage.getItem('celular');

      }else{

        this.paciente = data.recordSet.element;
        this.h_mensaje = false;
        this.h_nuevo_pac = true;
        this.h_crear = true;
        this.h_enlazar = false;

        var f_nacimiento = this.validar_fecha(data.recordSet.element.fecha_nacimiento);

        this.id_pa = data.recordSet.element.id;
        this.tipo_documento = data.recordSet.element.tipo_doc_identidad;
        this.nombres = data.recordSet.element.nombre;
        this.ap_materno = data.recordSet.element.apellido_materno;
        this.ap_paterno = data.recordSet.element.apellido_paterno;
        this.fecha_nacimiento = f_nacimiento;
        this.sexo = data.recordSet.element.sexo;
        this.departamento_dom_id = data.recordSet.element.departamento_dom;
        this.listarProvincia();
        this.provincia_dom_id = data.recordSet.element.provincia_dom;
        this.listarDistrito();
        this.distrito_dom_id = data.recordSet.element.distrito_dom;
        this.domicilio = data.recordSet.element.domicilio;
        this.estado_civil = data.recordSet.element.estado_civil;
        this.profesion = data.recordSet.element.profesion;
        this.tipo_sangre = data.recordSet.element.tipo_sangre;
        this.email = data.recordSet.element.correo;
        this.celular = data.recordSet.element.celular;
        this.listarDepartamento();
      }

      this.loading = false;

    })
  }

  listarPais(){
    this.externoService.listar_pais()
    .then((data) =>{
      this.e_nacionalidad = data.recordSet.element;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  listarDepartamento(){
    this.externoService.listar_departamentos()
    .then((data) =>{
      this.e_departamento_dom = data.recordSet.element;
    })
    .catch((error) => {
      console.log(error);
    });

  }

  listarProvincia(){
    this.provincia_dom_id = 0;
    this.distrito_dom_id = 0;

    this.externoService.listar_provincias(this.departamento_dom_id)
    .then((data) =>{
      this.e_provincia_dom = data.recordSet.element;
    })
    .catch((error) => {
      console.log(error);
    });

  }

  listarDistrito(){
    this.distrito_dom_id = 0;

    this.externoService.listar_distritos(this.provincia_dom_id, this.departamento_dom_id)
    .then((data) =>{
      this.e_distrito_dom = data.recordSet.element;
      //console.log(this.e_distrito_dom)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  validar_habilitar_doc_ide(){
    if(this.tipo_documento == 0 && this.h_enlazar == false){
      this.doc_ide = "";
      this.habilitar_doc_ide = true;
    }else{
      if(this.tipo_documento == 0 && this.h_enlazar == true){
        this.habilitar_doc_ide = true;
      }
    }
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
      //console.log(data);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.enlazar, 2);
      this.router.navigate(['/modulos/reserva']);
    });
    
    this.onCloseHandled();
    this.h_crear = true;
    this.h_enlazar = true;
    this.h_mensaje = true;
  }

  crear(){
    
    var bandera = false;

    //VALIDANDO FECHA DE NACIMIENTO
    if(this.fecha_nacimiento != null){
      var f_nacimiento = this.validar_fecha_registrar(this.fecha_nacimiento);
      //console.log(f_nacimiento)
    }

    //VALIDACIONES DE INGRESO

    if(this.doc_ide == "" || this.doc_ide == null){
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
    }else{
      if (this.doc_ide.length < 8) {
        this.settingsService.showNotification('top','right', this.settingsService.mensaje.campo_doc_identidad, 3);
      }else{
        if (this.nacionalidad_id == 0 || this.nacionalidad_id == null) {
          this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
        }else{
          if (this.nombres == "" || this.nombres == null) {
            this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
          }else{
            if (this.ap_paterno == "" || this.ap_paterno == null) {
              this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
            }else{
              if (this.ap_materno == "" || this.ap_materno == null) {
                this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
              }else{
                if (this.fecha_nacimiento == "" || this.fecha_nacimiento == null) {
                  this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                }else{
                  if (this.sexo == 0 || this.sexo == null) {
                    this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                  }else{
                    if (this.departamento_dom_id == 0 || this.departamento_dom_id == null) {
                      this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                    }else{
                      if (this.provincia_dom_id == 0 || this.provincia_dom_id == null) {
                        this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                      }else{
                        if (this.distrito_dom_id == 0 || this.distrito_dom_id == null) {
                          this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                        }else{
                          if (this.domicilio == "" || this.domicilio == null) {
                            this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                          }else{
                            if (this.estado_civil == 0 || this.estado_civil == null) {
                              this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                            }else{
                              if (this.tipo_sangre == 0 || this.tipo_sangre == null) {
                                this.settingsService.showNotification('top','right', this.settingsService.mensaje.campos_vacios, 4);
                              }else{

                                this.pacienteService.registrar(this.tipo_documento, this.doc_ide, this.nacionalidad_id, this.nombres, this.ap_paterno, this.ap_materno, f_nacimiento, this.sexo, this.departamento_dom_id, this.provincia_dom_id, this.distrito_dom_id, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular)
                                .then((data) =>{
                                  this.id_pa = data.recordSet.element[0].ins_paciente;
                                  bandera = true;

                                  if(bandera == true){
                                    this.enlazar();
                                    this.onCloseHandled();
                                  }
                            
                                  this.router.navigate(['/modulos/paciente']);
                                  this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });

                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  }
}
