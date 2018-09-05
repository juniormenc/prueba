import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as constantes from '../global/constantes';

@Injectable()
export class CitaService {
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
    
    public enlazar(id_re, id_pac): Promise<any>{
        let myData = {
            id_re: id_re,
            id_pac: id_pac
        };
        //console.log(myData)
        return this.http.put(
            constantes.urlServidor+'/cita/enlazar/'+id_re+'/'+id_pac,
            myData,
            {headers: this.getHeaders()}
        ).toPromise()
        .then((data) => data.json())
        .catch((error)=>console.log(error));
    }

    public pagar(nro_cita: any, fecha: any, costo_defecto: any, costo_final: any, paciente: any, turno: any){
        let myData = {
            nro_cita: '3',
            fecha: fecha,
            costo_defecto: costo_defecto,
            costo_final: costo_final,
            hora_inicio_consulta: '00:00',
            hora_fin_consulta: '00:00',
            paciente: paciente,
            turno: turno
        };
        return this.http.post(
            constantes.urlServidor + '/cita/pagar',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public reservar(fecha: any, horario: any, costo: any, paciente: any, turno: any){
        let myData = {
            fecha: fecha,
            horario: horario,
            tiempo: 3,
            costo: costo,
            paciente: paciente,
            turno: turno
        };
        return this.http.post(
            constantes.urlServidor + '/cita/reservar',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public eliminar_reserva(id){
        return this.http.delete(
            constantes.urlServidor + '/cita/reservar/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_cita_por_paciente(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/paciente/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva(){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva',
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_filtro(filtro: number){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/'+filtro,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_por_paciente(id: number, fecha: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/paciente/'+id+'/'+fecha,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_reserva_detalle(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/reserva/detalle/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_citas_hoy(id: number, turno_id: any, fecha_hoy: any){
        return this.http.get(
            constantes.urlServidor + '/cita/hoy/'+id+'/'+turno_id+'/'+fecha_hoy,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_historial_citas_por_paciente(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/historial/paciente/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public get_hc_por_cita_id(id: number){
        return this.http.get(
            constantes.urlServidor + '/cita/hc/cita/'+id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public registrar_evaluacion(p_ruc: any, p_empresa: any, p_fecha: any, p_t_doc_emitido: any, p_nro_doc_emitido: any, sv_fc: any, sv_fr: any, sv_pa: any, sv_tem: any, sv_pe: any, sv_tal: any, sv_imc: any, sv_dmo: any, h_p_a: any, in_d: any, act_fis: any, d_desc: any, m1: any, m1_det: any, m2: any, m2_det: any, m3: any, m3_det: any, m4: any, m4_det: any, m5: any, m5_det: any, m_rec_fis: any, m_rec_fis_tipo: any, m_rec_fis_otr: any, m_fis_rehab: any, m_alt_fitot: any, m_alt_fotohem: any, m_alt_prp: any, m_alt_cel_m: any, m_alt_infilt: any, m_alt_baro_cam: any, m_alt_ozono: any, e_v: any, e_v_otr: any, inter1: any, inter1_det: any, inter2: any, inter2_det: any, inter3: any, inter3_det: any, so_es_hemogr: any, so_es_hemogl: any, so_es_gluc: any, so_es_ure: any, so_es_creatin: any, so_es_ex_c_ori: any, so_es_hormon: any, so_es_cultiv: any, so_es_ecogra: any, so_es_rx: any, so_es_tomogr: any, so_es_resomag: any, so_es_otr: any, recom: any, remun: any, id: number){
        let myData = {
            p_ruc: p_ruc,
            p_empresa: p_empresa,
            p_fecha: p_fecha,
            p_t_doc_emitido: p_t_doc_emitido,
            p_nro_doc_emitido: p_nro_doc_emitido,
            sv_fc: sv_fc,
            sv_fr: sv_fr,
            sv_pa: sv_pa,
            sv_tem: sv_tem,
            sv_pe: sv_pe,
            sv_tal: sv_tal,
            sv_imc: sv_imc,
            sv_dmo: sv_dmo,
            h_p_a: h_p_a,
            in_d: in_d,
            act_fis: act_fis,
            d_desc: d_desc,
            m1: m1,
            m1_det: m1_det,
            m2: m2,
            m2_det: m2_det,
            m3: m3,
            m3_det: m3_det,
            m4: m4,
            m4_det: m4_det,
            m5: m5,
            m5_det: m5_det,
            m_rec_fis: m_rec_fis,
            m_rec_fis_tipo: m_rec_fis_tipo,
            m_rec_fis_otr: m_rec_fis_otr,
            m_fis_rehab: m_fis_rehab,
            m_alt_fitot: m_alt_fitot,
            m_alt_fotohem: m_alt_fotohem,
            m_alt_prp: m_alt_prp,
            m_alt_cel_m: m_alt_cel_m,
            m_alt_infilt: m_alt_infilt,
            m_alt_baro_cam: m_alt_baro_cam,
            m_alt_ozono: m_alt_ozono,
            e_v: e_v,
            e_v_otr: e_v_otr,
            inter1: inter1,
            inter1_det: inter1_det,
            inter2: inter2,
            inter2_det: inter2_det,
            inter3: inter3,
            inter3_det: inter3_det,
            so_es_hemogr: so_es_hemogr,
            so_es_hemogl: so_es_hemogl,
            so_es_gluc: so_es_gluc,
            so_es_ure: so_es_ure,
            so_es_creatin: so_es_creatin,
            so_es_ex_c_ori: so_es_ex_c_ori,
            so_es_hormon: so_es_hormon,
            so_es_cultiv: so_es_cultiv,
            so_es_ecogra: so_es_ecogra,
            so_es_rx: so_es_rx,
            so_es_tomogr: so_es_tomogr,
            so_es_resomag: so_es_resomag,
            so_es_otr: so_es_otr,
            recom: recom,
            remun: remun
        };
        return this.http.put(
            constantes.urlServidor + '/cita/evaluacion/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public registrar_evaluacion_ant(ant_tra: any, ant_lug_tra: any, ant_tie_ult_tra: any, ant_instru: any, ant_enf_card: any, ant_enf_card_det: any, ant_enf_pulm: any, ant_enf_pulm_det : any, ant_diab: any, ant_diab_det: any, ant_ale_alim: any, ant_ale_alim_det: any, ant_ale_medic: any, ant_ale_medic_det: any, ant_coles: any, ant_coles_det: any, ant_ts: any, ant_ts_det: any, ant_quir: any, ant_quir_det: any, ant_otr: any, ex_piel: any, ex_cabeza: any, ex_ojo: any, ex_torax: any, ex_ap_resp: any, ex_ap_card: any, ex_ap_gastr: any, ex_ap_genito: any, ex_ap_musc: any, ex_neuro: any, ana_lab: any, ana_lab_det: any, im_rx: any, im_tomo: any, im_reso: any, im_gamm: any, ima_det: any, dia_det: any, prono: any, id: number){
        let myData = {
            ant_tra: ant_tra,
            ant_lug_tra: ant_lug_tra,
            ant_tie_ult_tra: ant_tie_ult_tra,
            ant_instru: ant_instru,
            ant_enf_card: ant_enf_card,
            ant_enf_card_det: ant_enf_card_det,
            ant_enf_pulm: ant_enf_pulm,
            ant_enf_pulm_det: ant_enf_pulm_det,
            ant_diab: ant_diab,
            ant_diab_det: ant_diab_det,
            ant_ale_alim: ant_ale_alim,
            ant_ale_alim_det: ant_ale_alim_det,
            ant_ale_medic: ant_ale_medic,
            ant_ale_medic_det: ant_ale_medic_det,
            ant_coles: ant_coles,
            ant_coles_det: ant_coles_det,
            ant_ts: ant_ts,
            ant_ts_det: ant_ts_det,
            ant_quir: ant_quir,
            ant_quir_det: ant_quir_det,
            ant_otr: ant_otr,
            ex_piel: ex_piel,
            ex_cabeza: ex_cabeza,
            ex_ojo: ex_ojo,
            ex_torax: ex_torax,
            ex_ap_resp: ex_ap_resp,
            ex_ap_card: ex_ap_card,
            ex_ap_gastr: ex_ap_gastr,
            ex_ap_genito: ex_ap_genito,
            ex_ap_musc: ex_ap_musc,
            ex_neuro: ex_neuro,
            ana_lab: ana_lab,
            ana_lab_det: ana_lab_det,
            im_rx: im_rx,
            im_tomo: im_tomo,
            im_reso: im_reso,
            im_gamm: im_gamm,
            ima_det: ima_det,
            dia_det: dia_det,
            prono: prono
        };
        return this.http.put(
            constantes.urlServidor + '/cita/evaluacion_ant/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public cie_diagnostico(cita_id: number, code: any, enfermedad: any){
        let myData = {
            cita_id: cita_id,
            code: code,
            enfermedad: enfermedad
        };
        return this.http.post(
            constantes.urlServidor + '/cie_diagnostico',
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public modificar_cita_finalizar(id: number, hora_inicio: any, hora_fin: any){
        let myData = {
            hora_inicio: hora_inicio,
            hora_fin: hora_fin
        };
        return this.http.put(
            constantes.urlServidor + '/cita/finalizar/'+id,
            myData,
            {headers: this.getHeaders()})
            .toPromise()
            .then((data)=>data.json())
            .catch((error)=> console.log(error));
    }

    public listar_reservas_por_fecha(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/reservas_pendientes/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_diagnosticos(cita_id: any){
        return this.http.get(
            constantes.urlServidor + '/cie_diagnostico/diagnosticos/'+cita_id,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_citas_por_fecha(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/citas_por_atender/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    
    public listar_ingresos_citas(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_suma_ingresos_citas(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_suma/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_ingresos_citas_especialidad(fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_especialidad/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_ingresos_citas_por_medico(id: any, fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas/'+id+'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

    public listar_suma_ingresos_citas_por_medico(id: any, fecha_desde: any, fecha_hasta: any){
        return this.http.get(
            constantes.urlServidor + '/cita/reporte/ingresos_citas_suma/'+id+'/'+fecha_desde+'/'+fecha_hasta,
            {headers: this.getHeaders()}
        )
        .toPromise()
        .then((data)=>data.json())
        .catch((error)=> console.log(error));
    }

}