import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

@Injectable()
export class TurnoAtencionService {
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

    public listar_todos(){
        return this.http.get(
            constantes.urlServidor + '/turno',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar(filtro: any){
        return this.http.get(
            constantes.urlServidor + '/turno/listar/'+filtro,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public registrar(fecha, total_citas, usuario, consultorio, horario): Promise<any>{
        let myData = {
            fecha: fecha,
            total_citas: total_citas,
            usuario_id: usuario,
            consultorio_id: consultorio,
            horario_id: horario
        };

        return this.http.post(
            constantes.urlServidor+"/turno", myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public modificar(id, fecha, total_citas, usuario, consultorio, horario): Promise<any>{
        let myData = {
            id: id,
            fecha_turno: fecha,
            total_citas: total_citas,
            usuario_id: usuario,
            consultorio_id: consultorio,
            horario_id: horario
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/turno/'+id,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public detalle(id: number):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/turno/'+id,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public cambiar_estado(id, numero, estado): Promise<any>{
        let myData = {
            id: id,
            numero: numero,
            estado: estado
          };
          //console.log(myData)
         return this.http.put(
              constantes.urlServidor+'/turno/estado/'+id,
              myData,
              {headers: this.getHeaders()}
            ).toPromise()
            .then((data) => data.json())
            .catch((error)=>console.log(error));
    }

    public listar_turno_medico_disponible(id: number, fecha: any):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/turno/medico/'+id +'/'+fecha,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public reporte_turno_por_medico(id: number, fecha_desde: any, fecha_hasta: any):Promise<any>{
        let myData = {
            id: id,
            fecha_desde: fecha_desde,
            fecha_hasta: fecha_hasta
        };
        return this.http.get(
            constantes.urlServidor + '/turno/reporte-medico/'+id +'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public listar_mis_turnos(id: any, fecha_desde: any, fecha_hasta: any):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/turno/reporte/mis_turnos/'+id +'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    
}