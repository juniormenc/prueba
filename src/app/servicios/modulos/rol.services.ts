import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()
export class RolService {
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
            constantes.urlServidor + '/rol/todos',
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

}