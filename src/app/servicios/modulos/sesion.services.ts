import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

@Injectable()

export class SesionService {

    constructor(private http:Http){}

    private getHeaders(): Headers {
        let token = localStorage.getItem('jwt');
        let id = localStorage.getItem('id');
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token,
            'Id': id,
        });
        return headers;
      }
    
    public login(usuario:string,clave:string):Promise<any>{
        let myData = {
            usuario: usuario,
            clave: clave
        }
        return this.http.post(
            constantes.urlServidor + '/login', myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public cerrarSesion(): Promise<any[]> {
        return this.http.get(
        constantes.urlServidor + '/sign-off',
        { headers: this.getHeaders(), params: {} })
        .toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }
    
}
