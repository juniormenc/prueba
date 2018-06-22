import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CitaService } from '../../../servicios/modulos/cita.services';
import { SettingsService } from '../../../servicios/global/settings.service';

@Component({
  selector: 'reserva-listar',
  templateUrl: './reserva-listar.component.html',
  styleUrls: ['./reserva-listar.component.scss']
})
export class ReservaListarComponent implements OnInit {

  loading: boolean;

  e_reserva:any;
  displayR = 'none';
  e_reserva_paciente: Array<any>;

  constructor(
    private citaService: CitaService,
    private router: Router,
    private settingsService: SettingsService
  ) {  }

  ngOnInit() {
    this.listar_todos();
  }

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 0){
      this.listar(valor);
    }else{
      this.listar_todos();
    }
  }

  listar_todos(){

    this.loading = true;
    this.e_reserva = null;

    this.citaService.listar_reserva().then((data: any) =>{
      this.e_reserva = data.recordSet.element;
      //console.log(this.e_reserva)

      this.loading = false;
    });

  }

  listar(filtro){

    this.loading = true;
    this.e_reserva = null;

    this.citaService.listar_reserva_filtro(filtro).then((data: any) =>{
      this.e_reserva = data.recordSet.element;
      //console.log(this.e_reserva)
      this.loading = false;
    });
  }

  goToReservaPendiente(id){
    //console.log(id);
    this.citaService.listar_reserva_detalle(id).then((data:any) => {
      this.e_reserva_paciente = data.recordSet.element
      //console.log(this.e_reserva_paciente);
    });
    
    this.displayR='block';
  }

  onCloseHandled(){
    this.displayR='none';
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
        this.listar_todos();
      })
    }
    
  }

  eliminarReserva(reserva_id){
    this.citaService.eliminar_reserva(reserva_id).then((data:any)=>{
      //console.log(data);
      this.onCloseHandled();
      this.settingsService.showNotification('top','right', this.settingsService.mensaje.eliminar, 4);
      this.listar_todos();
    })
  }

  goToEnlazar(id:number, dni: string){
    //console.log(id);
    this.citaService.listar_reserva_detalle(id).then((data:any) => {
      localStorage.setItem("fecha", data.recordSet.element[0].fecha);
      localStorage.setItem("horario", data.recordSet.element[0].horario);
      localStorage.setItem("especialidad", data.recordSet.element[0].especialidad);
      localStorage.setItem("medico", data.recordSet.element[0].medico);
      localStorage.setItem("consultorio", data.recordSet.element[0].consultorio);
      localStorage.setItem("costo", data.recordSet.element[0].costo);

      this.router.navigate(['modulos/reserva/enlazar',id, dni]);
    });
  }

}
