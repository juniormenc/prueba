import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

@Injectable()

export class CieService {

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



}