import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()

export class PacienteService {

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

    public listar(filtro: any): Promise<any[]>{
        return this.http.get(
        constantes.urlServidor + '/paciente/listar/'+filtro,
        {headers: this.getHeaders()}
        ).toPromise()
        .then(
            (data) => data.json()
        )
        .catch((error) => console.log(error))
    }

    public listar_todos(): Promise<any[]>{
        return this.http.get(
        constantes.urlServidor + '/paciente',
        {headers: this.getHeaders()}
        ).toPromise()
        .then(
            (data) => data.json()
        )
        .catch((error) => console.log(error))
    }

    public registrar(tipo_doc, doc_ide, nacionalidad, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, departamento_dom, provincia_dom, distrito_dom, domicilio, estado_civil, profesion, tipo_sangre, email, celular): Promise<any>{
        let myData = {
            tipo_doc_identidad: tipo_doc,
            doc_identidad: doc_ide,
            nacionalidad: nacionalidad,
            nombres: nombres,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            fecha_nacimiento: fecha_nacimiento,
            sexo: sexo,
            departamento: departamento_dom,
            provincia: provincia_dom,
            distrito: distrito_dom,
            domicilio: domicilio,
            estado_civil: estado_civil,
            profesion: profesion,
            tipo_sangre: tipo_sangre,
            correo: email,
            celular: celular
        };

        return this.http.post(
            constantes.urlServidor+"/paciente", myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }
/*
    public elimnar(id: number): Promise<any>{
        return this.http.delete(
            constantes.urlServidor + '/paciente/'+id,
            {headers: this.getHeaders(), params:{} })
            .toPromise()
            .then((data)=> data.json())
            .catch((error) => console.log(error));
    }
*/
    public modificar(id, departamento_dom, provincia_dom, distrito_dom, domicilio, estado_civil, profesion, tipo_sangre, email, celular): Promise<any>{
        let myData = {
            id: id,
            departamento: departamento_dom,
            provincia: provincia_dom,
            distrito: distrito_dom,
            domicilio: domicilio,
            estado_civil: estado_civil,
            profesion: profesion,
            tipo_sangre: tipo_sangre,
            correo: email,
            celular: celular
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/paciente/'+id,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public detalle(id: number):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/paciente/'+id,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public detalle_doc_ide(doc_ide: string):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/paciente/doc_ide/'+doc_ide,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }
}


