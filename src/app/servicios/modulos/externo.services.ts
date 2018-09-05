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

    public listar_todos_cie_1(){
        return this.http.get(
            constantes.urlServidor_1 + '/cie',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_todos_cie_2(){
        return this.http.get(
            constantes.urlServidor_2 + '/cie',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_cie_1(filtro: any){
        return this.http.get(
            constantes.urlServidor_1 + '/cie/listar/'+filtro,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    public listar_cie_2(filtro: any){
        return this.http.get(
            constantes.urlServidor_2 + '/cie/listar/'+filtro,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

    }

    //
    public listar_todos(){
        return this.http.get(
            constantes.urlServidor + '/cie',
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));
    }

    //
    public listar(filtro: any){
        return this.http.get(
            constantes.urlServidor + '/cie/listar/'+filtro,
            {headers:this.getHeaders()}
        ).toPromise()
        .then(
            (data)=> data.json()
        )
        .catch((error)=> console.log(error));

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



}