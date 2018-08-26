import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

@Injectable()
export class CitaService {
    constructor(private http:Http){}

    private getHeaders():Headers{
        let token = localStorage.getItem('jwt');
        let id = localStorage.getItem('id');
        let headers  = new Headers({
            'Content-type':'application/json',
            'Authorization': token,
            'Id': id
        });
        return headers;
    }
    
    public enlazar(id_re, id_pac): Promise<any>{
        let myData = {
            id_re: id_re,
            id_pac: id_pac
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/cita/enlazar/'+id_re+'/'+id_pac,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public pagar(nro_cita: any, fecha: any, costo_defecto: any, costo_final: any, paciente: any, turno: any){
        let myData = {
            nro_cita: '3',
            fecha: fecha,
            costo_defecto: costo_defecto,
            costo_final: costo_final,
            hora_inicio_consulta: '00:00',
            hora_fin_consulta: '00:00',
            paciente: paciente,
            turno: turno
        };
        return this.http.post(
            constantes.urlServidor + '/cita/pagar',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public reservar(fecha: any, horario: any, costo: any, paciente: any, turno: any){
        let myData = {
            fecha: fecha,
            horario: horario,
            tiempo: 3,
            costo: costo,
            paciente: paciente,
            turno: turno
        };
        return this.http.post(
            constantes.urlServidor + '/cita/reservar',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public eliminar_reserva(id){
        return this.http.delete(
            constantes.urlServidor + '/cita/reservar/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_cita_por_paciente(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/paciente/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva(){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva',
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_filtro(filtro: number){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/'+filtro,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_por_paciente(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/paciente/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_detalle(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/detalle/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_citas_hoy(id: number, fecha_hoy: any){
        return this.http.get(
            constantes.urlServidor + '/cita/hoy/'+id+'/'+fecha_hoy,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_historial_citas_por_paciente(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/historial/paciente/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public registrar_evaluacion(talla: any, peso: any, presion: any, examenes_realizados: any, signos: any, sintomas: any, examenes_por_realizarse: any, diagnostico_medico: any, receta_tratamiento_medico: any, cita_id: number){
        let myData = {
            talla: talla,
            peso: peso,
            presion: presion,
            examenes_realizados: examenes_realizados,
            signos: signos,
            sintomas: sintomas,
            examenes_por_realizarse: examenes_por_realizarse,
            diagnostico_medico: diagnostico_medico,
            receta_tratamiento_medico: receta_tratamiento_medico,
            cita_id: cita_id
        };
        return this.http.post(
            constantes.urlServidor + '/cita/evaluacion',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public modificar_cita_finalizar(id: number, hora_inicio: any, hora_fin: any){
        let myData = {
            hora_inicio: hora_inicio,
            hora_fin: hora_fin
        };
        return this.http.put(
            constantes.urlServidor + '/cita/finalizar/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public listar_reservas_por_fecha(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/reservas_pendientes/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_citas_por_fecha(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/citas_por_atender/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    
    public listar_ingresos_citas(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_suma_ingresos_citas(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_suma/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_ingresos_citas_especialidad(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_especialidad/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_ingresos_citas_por_medico(id: any, fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas/'+id+'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_suma_ingresos_citas_por_medico(id: any, fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_suma/'+id+'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

}