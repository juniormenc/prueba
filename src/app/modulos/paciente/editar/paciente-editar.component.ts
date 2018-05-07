import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {PacienteService} from '../../../servicios/modulos/paciente.services';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.css']
})
export class PacienteEditarComponent implements OnInit {

  id:number;
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

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private router: Router) { }

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
    

    //Cargamos la data en los inputs
    this.pacienteService.detalle(this.id).then((data:any)=>{
      //console.log(data);
      var f_nacimiento = this.validar_fecha(data.recordSet.element.fecha_nacimiento);

      this.dni = data.recordSet.element.dni;
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
    });
  }

  modificar(){
    //VALIDANDO FECHA DE NACIMIENTO
    if(this.fecha_nacimiento != null){
      var f_nacimiento = this.validar_fecha_guardar(this.fecha_nacimiento);
    }

    this.pacienteService.modificar(this.id,this.dni, this.nombres, this.ap_paterno, this.ap_materno, f_nacimiento, this.sexo, this.domicilio, this.estado_civil, this.profesion, this.tipo_sangre, this.email, this.celular)
    .then((data) =>{
      //console.log(data);
      this.router.navigate(['/modulos/paciente']);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  gotoPaciente(){
    this.router.navigate(['/modulos/paciente']);
  }

}
