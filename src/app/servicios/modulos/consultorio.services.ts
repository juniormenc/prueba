import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

@Injectable()

export class ConsultorioService {

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
            constantes.urlServidor + '/consultorio',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar(filtro: any){
        return this.http.get(
            constantes.urlServidor + '/consultorio/listar/'+filtro,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public registrar(numero): Promise<any>{
        let myData = {
            numero: numero
        };

        return this.http.post(
            constantes.urlServidor+"/consultorio", myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public modificar(id, numero): Promise<any>{
        let myData = {
            id: id,
            numero: numero
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/consultorio/'+id,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public detalle(id: number):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/consultorio/'+id,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public cambiar_estado(id, estado): Promise<any>{
        let myData = {
            id: id,
            estado: estado
          };
          //console.log(myData)
         return this.http.put(
              constantes.urlServidor+'/consultorio/estado/'+id,
              myData,
              {headers: this.getHeaders()}
            ).toPromise()
            .then((data) => data.json())
            .catch((error)=>console.log(error));
    }
}