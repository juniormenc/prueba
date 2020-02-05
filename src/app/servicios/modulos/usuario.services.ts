import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()

export class UsuarioService {

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
    
    public registrar(usuario: any, clave: any, ri: any, nombre: any, correo: any){
        let myData = {
            usuario: usuario,
            clave: clave,
            ri: ri,
            nombre: nombre,
            correo: correo
        };
        return this.http.post(
            constantes.urlServidor + '/usuario',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public listar_todos(){
        return this.http.get(
            constantes.urlServidor + '/usuario/todos',
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_filtro(filtro: any){
        return this.http.get(
            constantes.urlServidor + '/usuario/filtro/'+filtro,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar(off: any, lim: any){
        return this.http.get(
            constantes.urlServidor + '/usuario/listar/'+off+'/'+lim,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_usuario_id(id: any){
        return this.http.get(
            constantes.urlServidor + '/usuario/id/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public modificar(id: any, usuario: any, ri: any, nombre: any, correo: any){
        let myData = {
            usuario: usuario,
            ri: ri,
            nombre: nombre,
            correo: correo
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public inhabilitar(id: any){
        let myData = {
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/off/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public habilitar(id: any){
        let myData = {
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/on/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public desactivar(id: any){
        let myData = {
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/active/off/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public activar(id: any){
        let myData = {
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/active/on/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public cambiarClaveId(id: any, clave: any){
        let myData = {
            clave: clave
        };
        return this.http.put(
            constantes.urlServidor + '/usuario/clave/id/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

}

