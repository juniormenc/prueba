import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../../servicios/global/constantes';

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

    public registrar(dni, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, domicilio, estado_civil, profesion, tipo_sangre, email, celular): Promise<any>{
        let myData = {
            dni: dni,
            nombres: nombres,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            fecha_nacimiento: fecha_nacimiento,
            sexo: sexo,
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
    public modificar(id, dni, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, domicilio, estado_civil, profesion, tipo_sangre, email, celular): Promise<any>{
        let myData = {
            id: id,
            dni: dni,
            nombres: nombres,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            fecha_nacimiento: fecha_nacimiento,
            sexo: sexo,
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

    public detalle_dni(dni: string):Promise<any>{
        return this.http.get(
            constantes.urlServidor + '/paciente/dni/'+dni,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error) => console.log(error));
    }

    public registrar_antecedentes(id): Promise<any>{
        let myData = {
            paciente_id: id,
        };

        return this.http.post(
            constantes.urlServidor+"/antecedentes", myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public listar_antecedentes_por_paciente(id:number): Promise<any>{
        return this.http.get(
            constantes.urlServidor+"/antecedentes/paciente/"+id,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public modificar_antecedentes(id, a_madre, a_padre, a_hermanos, a_hijos, a_otros_familiares, a_alcohol, a_tabaco, a_droga, a_observaciones_toxicologicas, a_hospitalizaciones, a_infartos, a_intervenciones, a_alergenos, a_farmacos_consume, a_enfermedades_padece, a_enfermedades_padecio, a_otros_antecedentes): Promise<any>{
        let myData = {
            id: id,
            a_madre: a_madre,
            a_padre: a_padre,
            a_hermanos: a_hermanos,
            a_hijos: a_hijos,
            a_otros_familiares: a_otros_familiares,
            a_alcohol: a_alcohol,
            a_tabaco: a_tabaco,
            a_droga: a_droga,
            a_observaciones_toxicologicas: a_observaciones_toxicologicas,
            a_hospitalizaciones: a_hospitalizaciones,
            a_infartos: a_infartos,
            a_intervenciones: a_intervenciones,
            a_alergenos: a_alergenos,
            a_farmacos_consume: a_farmacos_consume,
            a_enfermedades_padece: a_enfermedades_padece,
            a_enfermedades_padecio: a_enfermedades_padecio,
            a_otros_antecedentes: a_otros_antecedentes
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/antecedentes/'+id,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }
}


