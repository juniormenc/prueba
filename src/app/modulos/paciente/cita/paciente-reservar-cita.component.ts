import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../servicios/global/settings.service';

//Servicios:
import { EspecialidadService } from '../../../servicios/modulos/especialidad.services';
import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';
import { CitaService } from '../../../servicios/modulos/cita.services';

@Component({
  selector: 'app-paciente-reservar-cita',
  templateUrl: './paciente-reservar-cita.component.html',
  styleUrls: ['./paciente-reservar-cita.component.css']
})
export class PacienteReservarCitaComponent implements OnInit {

  constructor(
    private especialidadService: EspecialidadService, 
    private turnoService: TurnoAtencionService,
    private citaService: CitaService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  id: number;
  costo: string;
  especialidad:string;
  fecha: string;
  turno: Array<any>;
  v_turno: string;

  e_especialidad: Array<any>;
  e_turno: Array<any>;

  ngOnInit() {

    //Obtenemos el id de la ruta
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.especialidad = "0";
    this.costo = "0.00";

    //Listar Especialidades
    this.especialidadService.listar().then((data:any)=>{
      this.e_especialidad = data.recordSet.element;
    });

    this.fecha = this.fecha_actual();
  }

  fecha_actual(){

    var v_mes, v_dia, v_anio;

    var m = new Date().getMonth()+1;
    var d = new Date().getDate();

    v_anio = new Date().getFullYear();

    if(m < 10){
      v_mes = "0" + (new Date().getMonth()+1);
    } else {
      v_mes = (new Date().getMonth()+1);
    }

    if(d < 10){
      v_dia = "0" + (new Date().getDate());
    } else {
      v_dia = new Date().getDate();
    }

    return v_anio + "-" + v_mes + "-" + v_dia;
  }

  validar_fecha(fecha){
    var dia = fecha.substr(8, 2);
    var mes = fecha.substr(5, 2);
    var anio =  fecha.substr(0, 4);
    return dia + "-" + mes + "-" + anio;
  }

  //Listar Médicos según la Especialidad
  cargarDatos(){

    //CARGAR COSTO
    if(parseInt(this.especialidad) > 0) {
      this.costo = this.e_especialidad[parseInt(this.especialidad) - 1].costo;
    } else {
      this.costo = "0.00";
      this.e_turno = [];
    }

    //CARGAR HORARIOS DISPONIBLES DE MÉDICOS
    this.cargarTurnos();
  }

  cargarTurnos(){
    
    if(parseInt(this.especialidad) > 0) {
      this.turnoService.listar_turno_medico_disponible(parseInt(this.especialidad), this.fecha).then((data:any)=>{
        this.e_turno = data.recordSet.element;
        //console.log(this.e_turno);
      });
    }

  }

  reservarCita(id, horario){
    var f = this.validar_fecha(this.fecha);
    this.citaService.reservar(f, horario, parseFloat(this.costo), this.id, id).then((data:any)=>{
      //console.log(data);
      this.router.navigate(['/modulos/paciente']);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.reservar, 3);
    })
  }

  pagarCita(id){
    var f = this.validar_fecha(this.fecha);
    this.citaService.pagar(2, f, parseFloat(this.costo), parseFloat(this.costo), this.id, id).then((data:any)=>{
      //console.log(data);
      this.router.navigate(['/modulos/paciente']);
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
    })
  }

  gotoPaciente(){
    this.router.navigate(['/modulos/paciente']);
  }
}
