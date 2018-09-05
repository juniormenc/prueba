import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { ExternoService } from '../../../servicios/modulos/externo.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'paciente-registrar',
  templateUrl: './paciente-registrar.component.html',
  styleUrls: ['./paciente-registrar.component.css']
})
export class PacienteRegistrarComponent implements OnInit {

  id: number;
  tipo_documento: any;
  habilitar_doc_ide; any;
  doc_ide: string;
  nacionalidad_id: any;
  e_nacionalidad: any;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  sexo: number;
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
  email: string;
  celular: string;

  constructor(
    private pacienteService: PacienteService,
    private externoService: ExternoService,
    private settingsService: SettingsService,
    private router: Router
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
    
    this.listarPais();
    this.listarDepartamento();
  }

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return anio + "-" + mes + "-" + dia;
  }

  validar_habilitar_doc_ide(){
    if(this.tipo_documento == 0){
      this.doc_ide = "";
      this.habilitar_doc_ide = true;
    }else{
      this.habilitar_doc_ide = false;
    }
  }

  registrar(){

    //VALIDANDO FECHA DE NACIMIENTO
    if(this.fecha_nacimiento != null){
      var f_nacimiento = this.validar_fecha(this.fecha_nacimiento);
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
                                  this.id = data.recordSet.element[0].ins_paciente;
                            
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

    this.listarProvincia();

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

    this.listarDistrito();

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

  gotoPaciente(){
    this.router.navigate(['/modulos/paciente']);
  }

}
