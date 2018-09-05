import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()

export class ExternoService {

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

    //URL_3
    public listar_pais(){
        return this.http.get(
            constantes.urlServidor_3 + '/pais',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_departamentos(){
        return this.http.get(
            constantes.urlServidor_3 + '/departamento',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_provincias(id_dep: any){
        return this.http.get(
            constantes.urlServidor_3 + '/provincia/'+id_dep,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_distritos(id_pro: any, id_dep: any){
        return this.http.get(
            constantes.urlServidor_3 + '/distrito/'+id_pro+'/'+id_dep,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }


    public listar_pais_detalle(id){
        return this.http.get(
            constantes.urlServidor_3 + '/pais/detalle/'+id,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_departamentos_detalle(id){
        return this.http.get(
            constantes.urlServidor_3 + '/departamento/detalle/'+id,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_provincias_detalle(id_pro: any, id_dep: any){
        return this.http.get(
            constantes.urlServidor_3 + '/provincia/detalle/'+id_pro+'/'+id_dep,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_distritos_detalle(id_dis: any, id_pro: any, id_dep: any){
        return this.http.get(
            constantes.urlServidor_3 + '/distrito/detalle/'+id_dis+'/'+id_pro+'/'+id_dep,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }



}