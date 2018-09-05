import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { ExternoService } from '../../../servicios/modulos/externo.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.css']
})
export class PacienteEditarComponent implements OnInit {

  id:number;
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

  constructor(
    private pacienteService: PacienteService,
    private externoService: ExternoService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
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

  ngOnInit() {
    
    //Obtenemos el id de la ruta
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    //NACIONALIDAD
    this.listarPais();

    //Cargamos la data en los inputs
    this.pacienteService.detalle(this.id).then((data:any)=>{
      //console.log(data.recordSet.element);
      var f_nacimiento = this.validar_fecha(data.recordSet.element.fecha_nacimiento);

      this.tipo_documento = data.recordSet.element.tipo_doc_ide;
      this.doc_ide = data.recordSet.element.doc_ide;
      this.nacionalidad_id = data.recordSet.element.nacionalidad;
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
  );

    
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

  listarProvinciaChange(){
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

  modificar(){
    
    //VALIDACIONES DE INGRESO
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

                this.pacienteService.modificar(this.id, this.departamento_dom_id, this.provincia_dom_id, this.distrito_dom_id, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular)
                .then((data) =>{
                  //console.log(data);
                  this.router.navigate(['/modulos/paciente']);
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

  }

  gotoPaciente(){
    this.router.navigate(['/modulos/paciente']);
  }

}
