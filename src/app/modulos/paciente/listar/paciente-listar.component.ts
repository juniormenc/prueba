import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { CitaService } from '../../../servicios/modulos/cita.services';
import { TurnoAtencionService } from '../../../servicios/modulos/turno-atencion.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'paciente-listar',
  templateUrl: './paciente-listar.component.html',
  styleUrls: ['./paciente-listar.component.css']
})
export class PacienteListarComponent implements OnInit {

  loading: boolean;

  elemento: Array<any>;
  displayR = 'none';
  displayC = 'none';
  e_cita_paciente: Array<any>;
  e_reserva_paciente: Array<any>;

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 2){
      this.listar(valor);
    }else{
      if (valor.length == 0) {
        this.listar_todos();
      }
    }
  }

  constructor(
    private pacienteService: PacienteService,
    private citaService: CitaService,
    private turnoService: TurnoAtencionService,
    private router: Router,
    private settingsService: SettingsService
  ) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.listar_todos();
  }

  listar_todos(){

    this.loading = true;
    this.elemento = null;

    this.pacienteService.listar_todos().then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  listar(filtro){

    this.loading = true;
    this.elemento = null;

    this.pacienteService.listar(filtro).then((data: any) =>{
      this.elemento = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

  goToRegistrar(){
    this.router.navigate(['modulos/paciente/registrar']);
  }

  goToEditar(id:number){
    //console.log(id);
    this.router.navigate(['modulos/paciente/editar',id]);
  }

  goToCita(id: number){
    this.router.navigate(['modulos/paciente/reservar-cita',id]);
  }

  goToReservaPendiente(id){
    this.citaService.listar_reserva_por_paciente(id, this.fecha_actual()).then((data:any) => {
      this.e_reserva_paciente = data.recordSet.element
      //console.log(this.e_reserva_paciente);
    });
    
    this.displayR='block';
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

  goToCitaPendiente(id){
    this.citaService.listar_cita_por_paciente(id).then((data:any) => {
      this.e_cita_paciente = data.recordSet.element
      //console.log(this.e_cita_paciente);
    });

    this.displayC='block';
  }

  onCloseHandled(){
    this.displayR='none';
    this.displayC='none';
  }

  validar_fecha(fecha){
    var dia = fecha.substr(0, 2);
    var mes = fecha.substr(3, 2);
    var anio =  fecha.substr(6, 4);
    return anio + "-" + mes + "-" + dia;
  }

  pagar(fecha, costo, paciente_id, turno_id, reserva_id){
    var f = this.validar_fecha(fecha);
    var bandera = false;

    this.citaService.pagar(2, f, parseFloat(costo), parseFloat(costo), paciente_id, turno_id).then((data:any)=>{
      //console.log(data);
      bandera = true;
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.registrar, 2);
    })

    if(bandera = true){
      this.citaService.eliminar_reserva(reserva_id).then((data:any)=>{
        //console.log(data);
        this.onCloseHandled();
      })
    }
    
  }

  eliminarReserva(reserva_id, turno_id){

    var bandera = false;
    var ct = 0;
    this.citaService.eliminar_reserva(reserva_id).then((data:any)=>{
      //console.log(data);

      bandera = true;
    })

    if(bandera = true){
      this.turnoService.aumentar_citas_disponibles(turno_id).then((data: any) => {
        //console.log(data);
        ct = data.recordSet.element.upd_turno_aumentar_citas_disponibles;
        //console.log(ct);

        if(ct == 1 ){
          this.turnoService.habilitar(turno_id).then((data: any) => {
            //console.log(data);
          })
        }
      })

      this.onCloseHandled();
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.eliminar, 4);
    }
  }


}
