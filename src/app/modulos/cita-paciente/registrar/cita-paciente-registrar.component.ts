import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'app-cita-paciente-registrar',
  templateUrl: './cita-paciente-registrar.component.html',
  styleUrls: ['./cita-paciente-registrar.component.scss']
})
export class CitaPacienteRegistrarComponent implements OnInit {

  id:number;
  paciente_id: number;
  dni:string;
  paciente:string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  edad: number;
  sexo:number;
  domicilio: string;
  estado_civil: number;
  profesion: string;
  tipo_sangre: number;
  nombre_sexo: string;
  email:string;
  celular:string;

  ant_id:number;
  ant_madre: string;
  ant_padre: string;
  ant_hermanos: string;
  ant_hijos: string;
  ant_otros_familiares: string;
  ant_alcohol: number;
  ant_tabaco: number;
  ant_droga: number;
  ant_observaciones_toxicologicas: string;
  ant_hospitalizaciones: string;
  ant_infartos: number;
  ant_intervenciones: number;
  ant_alergenos: number;
  ant_farmacos_consume: string;
  ant_enfermedades_padece: string;
  ant_enfermedades_padecio: string;
  ant_otros_antecedentes: string;
  
  talla: any;
  peso: any;
  presion: any;
  examenes_realizados: any;
  signos: any;
  sintomas: any;
  examenes_por_realizarse: any;
  diagnostico_medico: any;
  receta_tratamiento_medico: any;

  hora_inicio_consulta: any;

  displayE = 'none';

  e_cita: Array<any>;

  constructor(private citaService: CitaService, private pacienteService: PacienteService, private router: Router, private route: ActivatedRoute) { }

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

    this.hora_inicio_consulta = (new Date().getHours()) + ":" + (new Date().getMinutes()) + ":" + (new Date().getSeconds());
    //console.log(this.hora_inicio_consulta);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.paciente_id = params['paciente_id']
    });

    this.pacienteService.detalle(this.paciente_id).then((data:any)=>{
      //console.log(data);

      var f_nacimiento = this.validar_fecha(data.recordSet.element.fecha_nacimiento);

      this.dni = data.recordSet.element.dni;
      this.paciente = data.recordSet.element.nombre + " " + data.recordSet.element.apellido_paterno + " " + data.recordSet.element.apellido_materno;
      this.nombre = data.recordSet.element.nombre
      this.apellido_paterno = data.recordSet.element.apellido_paterno;
      this.apellido_materno = data.recordSet.element.apellido_materno;
      this.fecha_nacimiento = f_nacimiento;
      this.edad = data.recordSet.element.edad;
      this.sexo = data.recordSet.element.sexo;
      this.domicilio = data.recordSet.element.domicilio;
      this.estado_civil = data.recordSet.element.estado_civil;
      this.profesion = data.recordSet.element.profesion;
      this.tipo_sangre = data.recordSet.element.tipo_sangre;
      this.email = data.recordSet.element.correo;
      this.celular = data.recordSet.element.celular;
    });

    this.pacienteService.listar_antecedentes_por_paciente(this.paciente_id).then((data:any)=>{
      //console.log(data);

      this.ant_id = data.recordSet.element.id;
      this.ant_madre = data.recordSet.element.ant_madre;
      this.ant_padre = data.recordSet.element.ant_padre;
      this.ant_hermanos = data.recordSet.element.ant_hermanos;
      this.ant_hijos = data.recordSet.element.ant_hijos;
      this.ant_otros_familiares = data.recordSet.element.ant_otros_familiares;
      this.ant_alcohol = data.recordSet.element.ant_alcohol;
      this.ant_tabaco = data.recordSet.element.ant_tabaco;
      this.ant_droga = data.recordSet.element.ant_droga;
      this.ant_observaciones_toxicologicas = data.recordSet.element.ant_observaciones_toxicologicas;
      this.ant_hospitalizaciones = data.recordSet.element.ant_hospitalizaciones;
      this.ant_infartos = data.recordSet.element.ant_infartos;
      this.ant_intervenciones = data.recordSet.element.ant_intervenciones;
      this.ant_alergenos = data.recordSet.element.ant_alergenos;
      this.ant_farmacos_consume = data.recordSet.element.ant_farmacos_consume;
      this.ant_enfermedades_padece = data.recordSet.element.ant_enfermedades_padece;
      this.ant_enfermedades_padecio = data.recordSet.element.ant_enfermedades_padecio;
      this.ant_otros_antecedentes = data.recordSet.element.ant_otros_antecedentes;
    });

  }

  regresar(){
    this.router.navigate(["modulos/cita-paciente"]);
  }

  gotoHistorialEpisodios(){
    this.citaService.listar_historial_citas_por_paciente(this.paciente_id).then((data: any) =>{
      this.e_cita = data.recordSet.element;
      //console.log(this.e_cita)
    });

    this.displayE='block';
  }

  onCloseHandled(){
    this.displayE='none';
  }

  guardarEpisodioHistoria(){

    var hora_fin_consulta = (new Date().getHours()) + ":" + (new Date().getMinutes()) + ":" + (new Date().getSeconds());
    var f = this.validar_fecha_guardar(this.fecha_nacimiento);

    this.pacienteService.modificar(this.paciente_id, this.dni, this.nombre, this.apellido_paterno, this.apellido_materno, f, this.sexo, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular).then((data: any) => {
      //console.log(data);
    })
    
    this.pacienteService.modificar_antecedentes(this.ant_id, this.ant_madre, this.ant_padre, this.ant_hermanos, this.ant_hijos, this.ant_otros_familiares, this.ant_alcohol, this.ant_tabaco, this.ant_droga, this.ant_observaciones_toxicologicas, this.ant_hospitalizaciones, this.ant_infartos, this.ant_intervenciones, this.ant_alergenos, this.ant_farmacos_consume, this.ant_enfermedades_padece, this.ant_enfermedades_padecio, this.ant_otros_antecedentes).then((data: any) => {
      //console.log(data);
    })

    this.citaService.modificar_cita_finalizar(this.id, this.hora_inicio_consulta, hora_fin_consulta).then((data: any) => {
      //console.log(data);
    })

    console.log(this.talla, this.peso, this.presion, this.examenes_realizados, this.signos, this.sintomas, this.examenes_por_realizarse, this.diagnostico_medico, this.receta_tratamiento_medico, this.id);
    
    this.citaService.registrar_evaluacion(this.talla, this.peso, this.presion, this.examenes_realizados, this.signos, this.sintomas, this.examenes_por_realizarse, this.diagnostico_medico, this.receta_tratamiento_medico, this.id).then((data: any) => {
      console.log(data);
    })

    this.router.navigate(["modulos/cita-paciente"]);
  }

}
