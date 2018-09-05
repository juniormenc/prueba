import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()

export class HorarioService {
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

    public listar(){
        return this.http.get(
            constantes.urlServidor + '/horario',
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data) => data.json())
        .catch((error)=> console.log(error));
    }

    public registrar(hora_entrada, hora_salida): Promise<any>{
        let myData = {
            hora_entrada: hora_entrada,
            hora_salida: hora_salida
        };

        return this.http.post(
            constantes.urlServidor+"/horario", myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public detalle(id: number):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/horario/'+id,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public modificar(id, hora_entrada, hora_salida): Promise<any>{
        let myData = {
            id: id,
            hora_entrada: hora_entrada,
            hora_salida: hora_salida
          };
          //console.log(myData)
         return this.http.put(
              constantes.urlServidor+'/horario/'+id,
              myData,
              {headers: this.getHeaders()}
            ).toPromise()
            .then((data) => data.json())
            .catch((error)=>console.log(error));
    }

    public cambiar_estado(id, estado): Promise<any>{
        let myData = {
            id: id,
            estado: estado
          };
          //console.log(myData)
         return this.http.put(
              constantes.urlServidor+'/horario/estado/'+id,
              myData,
              {headers: this.getHeaders()}
            ).toPromise()
            .then((data) => data.json())
            .catch((error)=>console.log(error));
    }


}