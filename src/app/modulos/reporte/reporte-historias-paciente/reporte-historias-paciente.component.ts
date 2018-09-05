import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var jsPDF: any; // Important

import { PacienteService } from '../../../servicios/modulos/paciente.services';
import { CitaService } from '../../../servicios/modulos/cita.services';
import { ExternoService } from '../../../servicios/modulos/externo.services';

@Component({
  selector: 'reporte-historias-paciente',
  templateUrl: './reporte-historias-paciente.component.html',
  styleUrls: ['./reporte-historias-paciente.component.scss']
})
export class ReporteHistoriasPacienteComponent implements OnInit {

  loading: boolean;

  e_pacientes: Array<any>;
  e_cita: Array<any>;
  e_cita_fecha: any;
  e_hc: Array<any>;

  displayE = 'none';
  displayHPDF = 'none';

  paciente:string;  
  paciente_id: number;

  //HISTORIAL VARIABLES PACIENTE
  h_paciente: any;
  h_tipo_documento: any;
  h_doc_ide: any;
  h_nacionalidad: any;
  h_fecha_nacimiento: any;
  h_edad: any;
  h_sexo:any;
  h_departamento_dom: any;
  h_provincia_dom: any;
  h_distrito_dom: any;
  h_domicilio: any;
  h_estado_civil: any;
  h_profesion: any;
  h_tipo_sangre: any;
  h_email:any;
  h_celular:any;

  //HISTORIAL VARIABLES SIGNOS VITALES
  h_frecuencia_cardiaca: any;
  h_frecuencia_respiratoria: any;
  h_presion_arterial: any;
  h_temperatura: any;
  h_peso: any;
  h_talla: any;
  h_imc: any;
  h_dmo: any;

  //HISTORIAL VARIABLES MOTIVO CONSULTA
  h_historial_padecimiento: any;
  h_intensidad_dolor: any;

  //HISTORIAL VARIABLES ANTECEDENTES
  h_trabaja: any;
  h_lugar_trabajo: any;
  h_tiempo_trabajo: any;
  h_grado_instruccion: any;
  h_ant_enf_cardiovascular: any;
  h_ant_enf_cardiovascular_detalle: any;
  h_ant_enf_pulmonar: any;
  h_ant_enf_pulmonar_detalle: any;
  h_ant_diabetes: any;
  h_ant_diabetes_detalle: any;
  h_ant_ale_alimentarias: any;
  h_ant_ale_alimentarias_detalle: any;
  h_ant_ale_medicamentosas: any;
  h_ant_ale_medicamentosas_detalle: any;
  h_ant_colesterol: any;
  h_ant_colesterol_detalle: any;
  h_ant_tsh: any;
  h_ant_tsh_detalle: any;
  h_ant_quirurgicos: any;
  h_ant_quirurgicos_detalle: any;
  h_ant_otros: any;

  //HISTORIAL VARIABLES EXAMEN
  h_exa_piel: any;
  h_exa_cabeza: any;
  h_exa_ojo: any;
  h_exa_torax: any;
  h_exa_ap_respiratorio: any;
  h_exa_ap_cardiovascular: any;
  h_exa_ap_gastrointestinal: any;
  h_exa_ap_genitourinario: any;
  h_exa_ap_musculo: any;
  h_exa_ap_neurologico: any;
  
  //HISTORIAL VARIABLES AYUDA DIAGNÓSTICA
  h_analisis_laboratorio: any;
  h_analisis_laboratorio_detalle: any;
  h_img_rx: any;
  h_img_tomografia: any;
  h_img_resonancia: any;
  h_img_gammagrafia: any;
  h_imagenologia_detalle: any;

  //HISTORIAL VARIABLES DIAGNOSTICO
  h_diagnostico: Array<any>;
  h_diagnostico_detalle: any;
  h_pronostico: any;

  //HISTORIAL VARIABLES INDICACIONES
  h_actividad_fisica: any;
  h_dias_descanso: any;
  h_med_1: any;
  h_med_1_detalle: any;
  h_med_2: any;
  h_med_2_detalle: any;
  h_med_3: any;
  h_med_3_detalle: any;
  h_med_4: any;
  h_med_4_detalle: any;
  h_med_5: any;
  h_med_5_detalle: any;
  h_med_rec_fisioterapia: any;
  h_med_rec_fis_tipo: any;
  h_med_rec_fis_otros: any;
  h_med_fisica_rehab: any;
  h_med_alt_fitoterapia: any;
  h_med_alt_fotohemoterapia: any;
  h_med_alt_prp: any;
  h_med_alt_cel_madres: any;
  h_med_alt_infiltracion: any;
  h_med_alt_baro_camara: any;
  h_med_alt_ozonoterapia: any;
  h_est_vida: any;
  h_est_vida_otros: any;
  h_interc_1: any;
  h_interc_1_detalle: any;
  h_interc_2: any;
  h_interc_2_detalle: any;
  h_interc_3: any;
  h_interc_3_detalle: any;
  h_sol_estudios_hemograma: any;
  h_sol_estudios_hemoglobina: any;
  h_sol_estudios_glucosa: any;
  h_sol_estudios_urea: any;
  h_sol_estudios_creatinina: any;
  h_sol_estudios_ex_comp_orina: any;
  h_sol_estudios_hormonales: any;
  h_sol_estudios_cultivos: any;
  h_sol_estudios_ecografia: any;
  h_sol_estudios_rx: any;
  h_sol_estudios_tomografia: any;
  h_sol_estudios_resonmagnetica: any;
  h_sol_estudios_otros: any;

  constructor(public pacienteService: PacienteService, public citaService: CitaService, public externoService: ExternoService, private router: Router) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
  }


  gotoHistorialEpisodios(id, ap_pat, ap_mat, nom){
    this.paciente = ap_pat + " " + ap_mat + ", " + nom;
    this.paciente_id = id;
    
    this.citaService.listar_historial_citas_por_paciente(this.paciente_id).then((data: any) =>{
      this.e_cita = data.recordSet.element;
      //console.log(this.e_cita)
    });

    this.displayE='block';
  }
  
  abrir_mod_pdf(cita_id, cita_fech){
    //console.log(cita_id);
    this.e_cita_fecha = cita_fech;
    //console.log(this.e_cita_fecha)

    this.pacienteService.detalle(this.paciente_id).then((data: any) =>{
      //console.log(data)
      this.h_paciente = data.recordSet.element.apellido_paterno + " " + data.recordSet.element.apellido_materno + ", " + data.recordSet.element.nombre;
      if (data.recordSet.element.tipo_doc_ide == 1) {
        this.h_tipo_documento = "LIBRETA ELECTORAL / DNI";
      } else {
        if (data.recordSet.element.tipo_doc_ide == 2) {
          this.h_tipo_documento = "CARNET DE EXTRANJERIA";
        } else {
          if (data.recordSet.element.tipo_doc_ide == 3) {
            this.h_tipo_documento = "RUC - P.NATURAL)";
          } else {
            if (data.recordSet.element.tipo_doc_ide == 4) {
              this.h_tipo_documento = "PASAPORTE";
            } else {
              if (data.recordSet.element.tipo_doc_ide == 5) {
                this.h_tipo_documento = "PARTIDA DE NACIMIENTO";
              } else {
                if (data.recordSet.element.tipo_doc_ide == 6) {
                  this.h_tipo_documento = "CÉDULA";
                }
              }
            }
          }
        }
      }

      this.h_doc_ide = data.recordSet.element.doc_ide;

      this.externoService.listar_pais_detalle(data.recordSet.element.nacionalidad).then(data => {
        this.h_nacionalidad = data.recordSet.element.pais;
        //console.log(this.h_nacionalidad);
      });

      this.h_fecha_nacimiento = data.recordSet.element.fecha_nacimiento;
      this.h_edad = data.recordSet.element.edad;

      if (data.recordSet.element.sexo == 1) {
        this.h_sexo = "MASCULINO";
      } else {
        if (data.recordSet.element.sexo == 1) {
          this.h_sexo = "FEMENINO";
        }
      }
      
      this.externoService.listar_departamentos_detalle(data.recordSet.element.departamento_dom).then(data => {
        this.h_departamento_dom = data.recordSet.element.departamento;
        //console.log(this.h_departamento_dom);
      });
      
      this.externoService.listar_provincias_detalle(data.recordSet.element.provincia_dom, data.recordSet.element.departamento_dom).then(data => {
        this.h_provincia_dom = data.recordSet.element.provincia;
        //console.log(this.h_provincia_dom);
      });

      this.externoService.listar_distritos_detalle(data.recordSet.element.distrito_dom, data.recordSet.element.provincia_dom, data.recordSet.element.departamento_dom).then(data => {
        this.h_distrito_dom = data.recordSet.element.distrito;
        //console.log(this.h_distrito_dom);
      });

      
      this.h_domicilio = data.recordSet.element.domicilio;

      if (data.recordSet.element.estado_civil == 1) {
        this.h_estado_civil = "SOLTER(O)(A)"
      } else {
        if (data.recordSet.element.estado_civil == 2) {
          this.h_estado_civil = "CASAD(O)(A)"
        } else {
          if (data.recordSet.element.estado_civil == 3) {
            this.h_estado_civil = "VIUD(O)(A)"
          } else {
            if (data.recordSet.element.estado_civil == 4) {
              this.h_estado_civil = "DIVORCIAD(O)(A)"
            } else {
              if (data.recordSet.element.estado_civil == 5) {
                this.h_estado_civil = "CONVIVIENTE"
              } else {
                if (data.recordSet.element.estado_civil == 6) {
                  this.h_estado_civil = "OTRO"
                }
              }
            }
          }
        }
      }

      this.h_profesion = data.recordSet.element.profesion;

      if (data.recordSet.element.tipo_sangre == 1) {
        this.h_tipo_sangre = "A+";
      } else {
        if (data.recordSet.element.tipo_sangre == 2) {
          this.h_tipo_sangre = "A-";
        } else {
          if (data.recordSet.element.tipo_sangre == 3) {
            this.h_tipo_sangre = "B+";
          } else {
            if (data.recordSet.element.tipo_sangre == 4) {
              this.h_tipo_sangre = "B-";
            } else {
              if (data.recordSet.element.tipo_sangre == 5) {
                this.h_tipo_sangre = "AB+";
              } else {
                if (data.recordSet.element.tipo_sangre == 6) {
                  this.h_tipo_sangre = "AB-";
                } else {
                  if (data.recordSet.element.tipo_sangre == 7) {
                    this.h_tipo_sangre = "O+";
                  } else {
                    if (data.recordSet.element.tipo_sangre == 8) {
                      this.h_tipo_sangre = "O-";
                    } else {
                      if (data.recordSet.element.tipo_sangre == 9) {
                        this.h_tipo_sangre = "Rh+";
                      } else {
                        if (data.recordSet.element.tipo_sangre == 10) {
                          this.h_tipo_sangre = "Rh-";
                        } else {
                          if (data.recordSet.element.tipo_sangre == 11) {
                            this.h_tipo_sangre = "DESCONOCE";
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
      this.h_email = data.recordSet.element.correo;
      this.h_celular = data.recordSet.element.celular;
    });

    this.citaService.get_hc_por_cita_id(cita_id).then((data: any) =>{
      this.e_hc = data.recordSet.element;
      //console.log(this.e_hc)

      //HISTORIAL VARIABLES SIGNOS VITALES
      this.h_frecuencia_cardiaca = data.recordSet.element.sig_v_frecuencia_cardiaca;
      this.h_frecuencia_respiratoria = data.recordSet.element.sig_v_frecuencia_respiratoria;
      this.h_presion_arterial = data.recordSet.element.sig_v_presion_arterial;
      this.h_temperatura = data.recordSet.element.sig_v_temperatura;
      this.h_peso = data.recordSet.element.sig_v_peso;
      this.h_talla = data.recordSet.element.sig_v_talla;
      this.h_imc = data.recordSet.element.sig_v_indice_masa_corporal;
      if (data.recordSet.element.sig_v_densidad_mineral_osea == 1) {
        this.h_dmo = "NORMAL";
      } else {
        if (data.recordSet.element.sig_v_densidad_mineral_osea == 2) {
          this.h_dmo = "OSTEOPENIA";
        } else {
          if (data.recordSet.element.sig_v_densidad_mineral_osea == 3) {
            this.h_dmo = "OSTEOSPOROSIS";
          }else {
            this.h_dmo = "";
          }
        }
      }

      //HISTORIAL VARIABLES MOTIVO CONSULTA
      this.h_historial_padecimiento = data.recordSet.element.historia_padecimientno_actual;
      this.h_intensidad_dolor = data.recordSet.element.intensidad_dolor;

      //HISTORIAL VARIABLES ANTECEDENTES
      if (data.recordSet.element.ant_trabaja == 1) {
        this.h_trabaja = "SÍ";
      } else {
        if (data.recordSet.element.ant_trabaja == 2) {
          this.h_trabaja = "NO";
        } else {
          this.h_trabaja = "";
        }
      }
      
      this.h_lugar_trabajo = data.recordSet.element.ant_lugar_trabajo;
      this.h_tiempo_trabajo = data.recordSet.element.ant_tiempo_ultimo_trabajo;

      if (data.recordSet.element.ant_instruccion == 1) {
        this.h_grado_instruccion = "NINGUNO";
      } else {
        if (data.recordSet.element.ant_instruccion == 2) {
          this.h_grado_instruccion = "PRIMARIO";
        } else {
          if (data.recordSet.element.ant_instruccion == 3) {
            this.h_grado_instruccion = "SECUNDARIO";
          } else {
            if (data.recordSet.element.ant_instruccion == 4) {
              this.h_grado_instruccion = "SUPERIOR";
            } else {
              this.h_grado_instruccion = "";
            }
          }
        }
      }

      if (data.recordSet.element.ant_enf_cardiovascular == 1) {
        this.h_ant_enf_cardiovascular = "NORMAL";
      } else {
        if (data.recordSet.element.ant_enf_cardiovascular == 2) {
          this.h_ant_enf_cardiovascular = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_enf_cardiovascular == 3) {
            this.h_ant_enf_cardiovascular = "DESCONOCE";
          } else {
            this.h_ant_enf_cardiovascular = "";
          }
        }
      }
      
      this.h_ant_enf_cardiovascular_detalle = data.recordSet.element.ant_enf_cardiovascular_detalle;

      if (data.recordSet.element.ant_enf_pulmonar == 1) {
        this.h_ant_enf_pulmonar = "NORMAL";
      } else {
        if (data.recordSet.element.ant_enf_pulmonar == 2) {
          this.h_ant_enf_pulmonar = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_enf_pulmonar == 3) {
            this.h_ant_enf_pulmonar = "DESCONOCE";
          } else {
            this.h_ant_enf_pulmonar = "";
          }
        }
      }
      
      this.h_ant_enf_pulmonar_detalle = data.recordSet.element.ant_enf_pulmonar_detalle;

      if (data.recordSet.element.ant_diabetes == 1) {
        this.h_ant_diabetes = "NORMAL";
      } else {
        if (data.recordSet.element.ant_diabetes == 2) {
          this.h_ant_diabetes = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_diabetes == 3) {
            this.h_ant_diabetes = "DESCONOCE";
          } else {
            this.h_ant_diabetes = "";
          }
        }
      }

      this.h_ant_diabetes_detalle = data.recordSet.element.ant_diabetes_detalle;

      if (data.recordSet.element.ant_ale_alimentarias == 1) {
        this.h_ant_ale_alimentarias = "NORMAL";
      } else {
        if (data.recordSet.element.ant_ale_alimentarias == 2) {
          this.h_ant_ale_alimentarias = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_ale_alimentarias == 3) {
            this.h_ant_ale_alimentarias = "DESCONOCE";
          } else {
            this.h_ant_ale_alimentarias = "";
          }
        }
      }

      this.h_ant_ale_alimentarias_detalle = data.recordSet.element.ant_ale_alimentarias_detalle;
      
      if (data.recordSet.element.ant_ale_medicamentosas == 1) {
        this.h_ant_ale_medicamentosas = "NORMAL";
      } else {
        if (data.recordSet.element.ant_ale_medicamentosas == 2) {
          this.h_ant_ale_medicamentosas = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_ale_medicamentosas == 3) {
            this.h_ant_ale_medicamentosas = "DESCONOCE";
          } else {
            this.h_ant_ale_medicamentosas = "";
          }
        }
      }

      this.h_ant_ale_medicamentosas_detalle = data.recordSet.element.ant_ale_medicamentosas_detalle;

      if (data.recordSet.element.ant_colesterol == 1) {
        this.h_ant_colesterol = "NORMAL";
      } else {
        if (data.recordSet.element.ant_colesterol == 2) {
          this.h_ant_colesterol = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_colesterol == 3) {
            this.h_ant_colesterol = "DESCONOCE";
          } else {
            this.h_ant_colesterol = "";
          }
        }
      }

      this.h_ant_colesterol_detalle = data.recordSet.element.ant_colesterol_detalle;

      if (data.recordSet.element.ant_tsh == 1) {
        this.h_ant_tsh = "NORMAL";
      } else {
        if (data.recordSet.element.ant_tsh == 2) {
          this.h_ant_tsh = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_tsh == 3) {
            this.h_ant_tsh = "DESCONOCE";
          } else {
            this.h_ant_tsh = "";
          }
        }
      }
      
      this.h_ant_tsh_detalle = data.recordSet.element.ant_tsh_detalle;

      if (data.recordSet.element.ant_quirurgicos == 1) {
        this.h_ant_quirurgicos = "NORMAL";
      } else {
        if (data.recordSet.element.ant_quirurgicos == 2) {
          this.h_ant_quirurgicos = "ANORMAL";
        } else {
          if (data.recordSet.element.ant_quirurgicos == 3) {
            this.h_ant_quirurgicos = "DESCONOCE";
          } else {
            this.h_ant_quirurgicos = "";
          }
        }
      }
      
      this.h_ant_quirurgicos_detalle = data.recordSet.element.ant_quirurgicos_detalle;

      this.h_ant_otros = data.recordSet.element.ant_otros;

      //HISTORIAL VARIABLES EXAMEN
      this.h_exa_piel = data.recordSet.element.exa_piel;
      this.h_exa_cabeza = data.recordSet.element.exa_cabeza;
      this.h_exa_ojo = data.recordSet.element.exa_ojo;
      this.h_exa_torax = data.recordSet.element.exa_torax;
      this.h_exa_ap_respiratorio = data.recordSet.element.exa_ap_respiratorio;
      this.h_exa_ap_cardiovascular = data.recordSet.element.exa_ap_cardiovascular;
      this.h_exa_ap_gastrointestinal = data.recordSet.element.exa_ap_gastrointestinal;
      this.h_exa_ap_genitourinario = data.recordSet.element.exa_ap_genitourinario;
      this.h_exa_ap_musculo = data.recordSet.element.exa_ap_musculo;
      this.h_exa_ap_neurologico = data.recordSet.element.exa_neurologico;
      
      //HISTORIAL VARIABLES AYUDA DIAGNÓSTICA
      if (data.recordSet.element.analisis_laboratorio == 1) {
        this.h_analisis_laboratorio = "NO";
      } else {
        if (data.recordSet.element.analisis_laboratorio == 2) {
          this.h_analisis_laboratorio = "SÍ";
        } else {
          if (data.recordSet.element.analisis_laboratorio == 3) {
            this.h_analisis_laboratorio = "NORMAL";
          } else {
            if (data.recordSet.element.analisis_laboratorio == 4) {
              this.h_analisis_laboratorio = "ANORMAL";
            } else {
              this.h_analisis_laboratorio = "";
            }
          }
        }
      }
      
      this.h_analisis_laboratorio_detalle = data.recordSet.element.analisis_laboratorio_detalle;

      if (data.recordSet.element.img_rx == 1) {
        this.h_img_rx = "NO";
      } else {
        if (data.recordSet.element.img_rx == 2) {
          this.h_img_rx = "SÍ";
        } else {
          if (data.recordSet.element.img_rx == 3) {
            this.h_img_rx = "NORMAL";
          } else {
            if (data.recordSet.element.img_rx == 4) {
              this.h_img_rx = "ANORMAL";
            } else {
              this.h_img_rx = "";
            }
          }
        }
      }

      if (data.recordSet.element.img_tomografia == 1) {
        this.h_img_tomografia = "NO";
      } else {
        if (data.recordSet.element.img_tomografia == 2) {
          this.h_img_tomografia = "SÍ";
        } else {
          if (data.recordSet.element.img_tomografia == 3) {
            this.h_img_tomografia = "NORMAL";
          } else {
            if (data.recordSet.element.img_tomografia == 4) {
              this.h_img_tomografia = "ANORMAL";
            } else {
              this.h_img_tomografia = "";
            }
          }
        }
      }

      if (data.recordSet.element.img_resonancia == 1) {
        this.h_img_resonancia = "NO";
      } else {
        if (data.recordSet.element.img_resonancia == 2) {
          this.h_img_resonancia = "SÍ";
        } else {
          if (data.recordSet.element.img_resonancia == 3) {
            this.h_img_resonancia = "NORMAL";
          } else {
            if (data.recordSet.element.img_resonancia == 4) {
              this.h_img_resonancia = "ANORMAL";
            } else {
              this.h_img_resonancia = "";
            }
          }
        }
      }

      if (data.recordSet.element.img_gammagrafia == 1) {
        this.h_img_gammagrafia = "NO";
      } else {
        if (data.recordSet.element.img_gammagrafia == 2) {
          this.h_img_gammagrafia = "SÍ";
        } else {
          if (data.recordSet.element.img_gammagrafia == 3) {
            this.h_img_gammagrafia = "NORMAL";
          } else {
            if (data.recordSet.element.img_gammagrafia == 4) {
              this.h_img_gammagrafia = "ANORMAL";
            } else {
              this.h_img_gammagrafia = "";
            }
          }
        }
      }
      
      this.h_imagenologia_detalle = data.recordSet.element.imagenologia_detalle;

      //HISTORIAL VARIABLES DIAGNOSTICO
      this.h_diagnostico_detalle = data.recordSet.element.diagnostico_detalle;

      if (data.recordSet.element.pronostico == 1) {
        this.h_pronostico = "BUENO PARA LA VIDA";
      } else {
        if (data.recordSet.element.pronostico == 2) {
          this.h_pronostico = "BUENO PARA LA FUNCIÓN";
        } else {
          if (data.recordSet.element.pronostico == 3) {
            this.h_pronostico = "RESERVADO";
          } else {
            this.h_pronostico = "";
          }
        }
      }
      
      //HISTORIAL VARIABLES INDICACIONES
      if (data.recordSet.element.actividad_fisica == 1) {
        this.h_actividad_fisica = "DESCANSO MÉDICO";
      } else {
        if (data.recordSet.element.actividad_fisica == 2) {
          this.h_actividad_fisica = "REPOSO RELATIVO";
        } else {
          if (data.recordSet.element.actividad_fisica == 3) {
            this.h_actividad_fisica = "NO ESFUERZO FÍSICO";
          } else {
            if (data.recordSet.element.actividad_fisica == 4) {
              this.h_actividad_fisica = "ACTIVIDAD NORMAL";
            } else {
              this.h_actividad_fisica = "";
            }
          }
        }
      }
      
      this.h_dias_descanso = data.recordSet.element.dias_descanso;
      this.h_med_1 = data.recordSet.element.med_1;
      this.h_med_1_detalle = data.recordSet.element.med_1_detalle;
      this.h_med_2 = data.recordSet.element.med_2;
      this.h_med_2_detalle = data.recordSet.element.med_2_detalle;
      this.h_med_3 = data.recordSet.element.med_3;
      this.h_med_3_detalle = data.recordSet.element.med_3_detalle;
      this.h_med_4 = data.recordSet.element.med_4;
      this.h_med_4_detalle = data.recordSet.element.med_4_detalle;
      this.h_med_5 = data.recordSet.element.med_5;
      this.h_med_5_detalle = data.recordSet.element.med_5_detalle;
      
      if (data.recordSet.element.med_rec_fisioterapia == 1) {
        this.h_med_rec_fisioterapia = "NO";
      } else {
        if (data.recordSet.element.med_rec_fisioterapia == 2) {
          this.h_med_rec_fisioterapia = "SÍ";
        } else {
          this.h_med_rec_fisioterapia = "";
        }
      }

      if (data.recordSet.element.med_rec_fis_tipo == 1) {
        this.h_med_rec_fis_tipo = "MAGNETO";
      } else {
        if (data.recordSet.element.med_rec_fis_tipo == 2) {
          this.h_med_rec_fis_tipo = "ULTRASONIDO";
        } else {
          if (data.recordSet.element.med_rec_fis_tipo == 3) {
            this.h_med_rec_fis_tipo = "ONDAS DE CHOQUE";
          } else {
            if (data.recordSet.element.med_rec_fis_tipo == 4) {
              this.h_med_rec_fis_tipo = "ELECTRO ESTIMULACIÓN";
            } else {
              if (data.recordSet.element.med_rec_fis_tipo == 5) {
                this.h_med_rec_fis_tipo = "OTROS";
              } else {
                this.h_med_rec_fis_tipo = "";
              }
            }
          }
        }
      }
      
      this.h_med_rec_fis_otros = data.recordSet.element.med_rec_fis_otros;

      if (data.recordSet.element.med_fisica_rehab == 1) {
        this.h_med_fisica_rehab = "NO";
      } else {
        if (data.recordSet.element.med_fisica_rehab == 2) {
          this.h_med_fisica_rehab = "SÍ";
        } else {
          this.h_med_fisica_rehab = "";
        }
      }
      
      if (data.recordSet.element.med_alt_fitoterapia == 1) {
        this.h_med_alt_fitoterapia = "NO";
      } else {
        if (data.recordSet.element.med_alt_fitoterapia == 2) {
          this.h_med_alt_fitoterapia = "SÍ";
        } else {
          this.h_med_alt_fitoterapia = "";
        }
      }

      this.h_med_alt_fotohemoterapia = data.recordSet.element.med_alt_fotohemoterapia;
      this.h_med_alt_prp = data.recordSet.element.med_alt_prp;
      this.h_med_alt_cel_madres = data.recordSet.element.med_alt_cel_madres;

      if (data.recordSet.element.med_alt_infiltracion == 1) {
        this.h_med_alt_infiltracion = "NINGUNO";
      } else {
        if (data.recordSet.element.med_alt_infiltracion == 2) {
          this.h_med_alt_infiltracion = "MEDICAMENTOSO";
        } else {
          if (data.recordSet.element.med_alt_infiltracion == 3) {
            this.h_med_alt_infiltracion = "NO MEDICAN";
          } else {
            this.h_med_alt_infiltracion = "";
          }
        }
      }
      
      this.h_med_alt_baro_camara = data.recordSet.element.med_alt_baro_camara;
      this.h_med_alt_ozonoterapia = data.recordSet.element.med_alt_ozonoterapia;
      
      if (data.recordSet.element.est_vida == 1) {
        this.h_est_vida = "TROTE";
      } else {
        if (data.recordSet.element.est_vida == 2) {
          this.h_est_vida = "DANZA";
        } else {
          if (data.recordSet.element.est_vida == 3) {
            this.h_est_vida = "SPA";
          } else {
            if (data.recordSet.element.est_vida == 4) {
              this.h_est_vida = "NATACIÓN";
            } else {
              if (data.recordSet.element.est_vida == 5) {
                this.h_est_vida = "OTROS";
              } else {
                this.h_est_vida = "";
              }
            }
          }
        }
      }
      
      this.h_est_vida_otros = data.recordSet.element.est_vida_otros;
      this.h_interc_1 = data.recordSet.element.interc_1;
      this.h_interc_1_detalle = data.recordSet.element.interc_1_detalle;
      this.h_interc_2 = data.recordSet.element.interc_2;
      this.h_interc_2_detalle = data.recordSet.element.interc_2_detalle;
      this.h_interc_3 = data.recordSet.element.interc_3;
      this.h_interc_3_detalle = data.recordSet.element.interc_3_detalle;

      if (data.recordSet.element.sol_estudios_hemograma == true) {
        this.h_sol_estudios_hemograma = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_hemograma == false) {
          this.h_sol_estudios_hemograma = "NO";
        } else {
          this.h_sol_estudios_hemograma = "";
        }
      }

      //console.log(this.h_sol_estudios_hemograma)

      if (data.recordSet.element.sol_estudios_hemoglobina == true) {
        this.h_sol_estudios_hemoglobina = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_hemoglobina == false) {
          this.h_sol_estudios_hemoglobina = "NO";
        } else {
          this.h_sol_estudios_hemoglobina = "";
        }
      }

      //console.log(this.h_sol_estudios_hemoglobina)

      if (data.recordSet.element.sol_estudios_glucosa == true) {
        this.h_sol_estudios_glucosa = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_glucosa == false) {
          this.h_sol_estudios_glucosa = "NO";
        } else {
          this.h_sol_estudios_glucosa = "";
        }
      }

      //console.log(this.h_sol_estudios_glucosa)

      if (data.recordSet.element.sol_estudios_urea == true) {
        this.h_sol_estudios_urea = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_urea == false) {
          this.h_sol_estudios_urea = "NO";
        } else {
          this.h_sol_estudios_urea = "";
        }
      }

      //console.log(this.h_sol_estudios_urea)

      if (data.recordSet.element.sol_estudios_creatinina == true) {
        this.h_sol_estudios_creatinina = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_creatinina == false) {
          this.h_sol_estudios_creatinina = "NO";
        } else {
          this.h_sol_estudios_creatinina = "";
        }
      }

      //console.log(this.h_sol_estudios_creatinina)

      if (data.recordSet.element.sol_estudios_ex_comp_orina == true) {
        this.h_sol_estudios_ex_comp_orina = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_ex_comp_orina == false) {
          this.h_sol_estudios_ex_comp_orina = "NO";
        } else {
          this.h_sol_estudios_ex_comp_orina = "";
        }
      }

      //console.log(this.h_sol_estudios_ex_comp_orina)

      if (data.recordSet.element.sol_estudios_hormonales == true) {
        this.h_sol_estudios_hormonales = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_hormonales == false) {
          this.h_sol_estudios_hormonales = "NO";
        } else {
          this.h_sol_estudios_hormonales = "";
        }
      }

      //console.log(this.h_sol_estudios_hormonales)

      if (data.recordSet.element.sol_estudios_cultivos == true) {
        this.h_sol_estudios_cultivos = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_cultivos == false) {
          this.h_sol_estudios_cultivos = "NO";
        } else {
          this.h_sol_estudios_cultivos = "";
        }
      }

      //console.log(this.h_sol_estudios_cultivos)

      if (data.recordSet.element.sol_estudios_ecografia == true) {
        this.h_sol_estudios_ecografia = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_ecografia == false) {
          this.h_sol_estudios_ecografia = "NO";
        } else {
          this.h_sol_estudios_ecografia = "";
        }
      }

      //console.log(this.h_sol_estudios_ecografia)

      if (data.recordSet.element.sol_estudios_rx == true) {
        this.h_sol_estudios_rx = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_rx == false) {
          this.h_sol_estudios_rx = "NO";
        } else {
          this.h_sol_estudios_rx = "";
        }
      }

      //console.log(this.h_sol_estudios_rx)

      if (data.recordSet.element.sol_estudios_tomografia == true) {
        this.h_sol_estudios_tomografia = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_tomografia == false) {
          this.h_sol_estudios_tomografia = "NO";
        } else {
          this.h_sol_estudios_tomografia = "";
        }
      }

      //console.log(this.h_sol_estudios_tomografia)

      if (data.recordSet.element.sol_estudios_resonmagnetica == true) {
        this.h_sol_estudios_resonmagnetica = "SÍ";
      } else {
        if (data.recordSet.element.sol_estudios_resonmagnetica == false) {
          this.h_sol_estudios_resonmagnetica = "NO";
        } else {
          this.h_sol_estudios_resonmagnetica = "";
        }
      }

      //console.log(this.h_sol_estudios_resonmagnetica)
      
      this.h_sol_estudios_otros = data.recordSet.element.sol_estudios_otros;

      //HISTORIAL VARIABLES OBSERVACIONES Y REMUNERACIÓN
      /*
      this.h_recomendaciones = data.recordSet.element.recomendaciones;
      console.log(this.h_recomendaciones)
      this.h_remuneracion = data.recordSet.element.remuneracion;
      console.log(this.h_remuneracion)
      this.h_pag_ruc = data.recordSet.element.pag_ruc;
      this.h_pag_empresa = data.recordSet.element.pag_empresa;
      this.h_pag_fecha = data.recordSet.element.pag_fecha;
      this.h_pag_t_doc_emitido = data.recordSet.element.pag_t_doc_emitido;
      console.log(this.h_pag_t_doc_emitido)
      this.h_pag_nro_doc_emitido = data.recordSet.element.pag_nro_doc_emitido;
      */
    });

    this.citaService.listar_diagnosticos(cita_id).then(data => {
      this.h_diagnostico = data.recordSet.element;
      //console.log(this.h_diagnostico)
    })
    this.displayHPDF='block';
  }

  downloadPDF(){

    //PDF
    var doc = new jsPDF('p','pt','a4');

    doc.setFontType("bolditalic");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("Fecha de atención: " + this.e_cita_fecha, 50, 20);

    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.setFontSize(11);
    doc.text("HISTORIA CLÍNICA N° " + this.h_doc_ide, 200, 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);

    doc.setFontType("bold");
    doc.text("Paciente:", 200, 70);
    doc.setFontType("normal");
    doc.text(this.h_paciente, 260, 70);

    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("I. DATOS GENERALES", 50,  90);
    
    doc.setTextColor(0, 0, 0);
    doc.text("1. INFORMACIÓN GENERAL", 60, 110);
    

    doc.setFontType("bold");
    doc.text("F.Nacim:", 70, 125);
    doc.setFontType("normal");
    doc.text(this.h_fecha_nacimiento, 120, 125);

    doc.setFontType("bold");
    doc.text("Edad:", 190, 125);
    doc.setFontType("normal");
    doc.text(this.h_edad, 220, 125);

    doc.setFontType("bold");
    doc.text("Est.Civil:", 260, 125);
    doc.setFontType("normal");
    doc.text(this.h_estado_civil, 310, 125);
    
    doc.setFontType("bold");
    doc.text("Sexo:", 410, 125);
    doc.setFontType("normal");
    doc.text(this.h_sexo, 440, 125);




    doc.setFontType("bold");
    doc.text("T.Sangre:", 70, 140);
    doc.setFontType("normal");
    doc.text(this.h_tipo_sangre, 120, 140);

    doc.setFontType("bold");
    doc.text("Profesión:", 195, 140);
    doc.setFontType("normal");
    doc.text(this.h_profesion, 250, 140);

    doc.setFontType("bold");
    doc.text("País:", 380, 140);
    doc.setFontType("normal");
    doc.text(""+this.h_nacionalidad, 410, 140);
    
    



    doc.setFontType("bold");
    doc.text("Celular:", 70, 155);
    doc.setFontType("normal");
    doc.text(this.h_celular, 120, 155);

    doc.setFontType("bold");
    doc.text("E-mail:", 200, 155);
    doc.setFontType("normal");
    doc.text(this.h_email, 250, 155);

    

    doc.setFontType("bold");
    doc.text("2. DOMICILIO", 60, 175);

    doc.setFontType("bold");
    doc.text("Dpto:", 70, 190);
    doc.setFontType("normal");
    doc.text(this.h_departamento_dom, 100, 190);

    doc.setFontType("bold");
    doc.text("Prov:", 250, 190);
    doc.setFontType("normal");
    doc.text(this.h_provincia_dom, 280, 190);

    doc.setFontType("bold");
    doc.text("Dist:", 410, 190);
    doc.setFontType("normal");
    doc.text(this.h_distrito_dom, 440, 190);





    doc.setFontType("bold");
    doc.text("Dirección:", 70, 205);
    doc.setFontType("normal");
    doc.text(this.h_domicilio, 125, 205);
    

    //////////////////////////////////////////////////////////
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("II. SIGNOS VITALES", 50, 235);
    
    doc.setTextColor(0, 0, 0);

    doc.text("FC:", 70, 255);
    doc.setFontType("normal");
    doc.text(""+this.h_frecuencia_cardiaca, 100, 255);

    doc.setFontType("bold");
    doc.text("FR:", 190, 255);
    doc.setFontType("normal");
    doc.text(""+this.h_frecuencia_respiratoria, 220, 255);

    doc.setFontType("bold");
    doc.text("P/A:", 310, 255);
    doc.setFontType("normal");
    doc.text(""+this.h_presion_arterial, 340, 255);

    doc.setFontType("bold");
    doc.text("T°:", 430, 255);
    doc.setFontType("normal");
    doc.text(""+this.h_temperatura, 460, 255);





    doc.setFontType("bold");
    doc.text("Peso (Kg):", 70, 270);
    doc.setFontType("normal");
    doc.text(""+this.h_peso, 130, 270);

    doc.setFontType("bold");
    doc.text("Talla (m):", 190, 270);
    doc.setFontType("normal");
    doc.text(""+this.h_talla, 250, 270);

    doc.setFontType("bold");
    doc.text("IMC:", 310, 270);
    doc.setFontType("normal");
    doc.text(""+this.h_imc, 340, 270);

    doc.setFontType("bold");
    doc.text("DMO:", 430, 270);
    doc.setFontType("normal");
    doc.text(""+this.h_dmo, 460, 270);



    //////////////////////////////////////////////////////////
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("III. MOTIVO CONSULTA", 50, 300);
    
    doc.setTextColor(0, 0, 0);
    
    doc.setFontType("bold");
    doc.text("Hist.Padecimiento:", 70, 320);
    doc.setFontType("normal");
    doc.text(this.h_historial_padecimiento.substr(0,63), 170, 320);
    doc.text(this.h_historial_padecimiento.substr(63,80), 70, 335);
    doc.text(this.h_historial_padecimiento.substr(143,80), 70, 350);
    doc.text(this.h_historial_padecimiento.substr(223,80), 70, 365);
    
    doc.setFontType("bold");
    doc.text("Dolor (EVA):", 70, 380);
    doc.setFontType("normal");
    doc.text(""+this.h_intensidad_dolor, 130, 380);

    

    //////////////////////////////////////////////////////////
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("IV. ANTECEDENTES", 50, 410);

    doc.setTextColor(0, 0, 0);
    doc.text("1. ANTECEDENTES LABORALES", 60, 430);
    

    doc.text("¿Trabaja?", 70, 445);
    doc.setFontType("normal");
    doc.text(this.h_trabaja, 120, 445);

    doc.setFontType("bold");
    doc.text("Lugar:", 170, 445);
    doc.setFontType("normal");
    doc.text(this.h_lugar_trabajo, 205, 445);

    doc.setFontType("bold");
    doc.text("Tiempo:", 340, 445);
    doc.setFontType("normal");
    doc.text(this.h_tiempo_trabajo, 380, 445);
    
    doc.setFontType("bold");
    doc.text("G.Instrucción:", 445, 445);
    doc.setFontType("normal");
    doc.text(this.h_grado_instruccion, 515, 445);

    doc.setFontType("bold");
    doc.text("2. ANTECEDENTES PATOLÓGICOS", 60, 465);
    
    doc.text("Enf.Cardiovascular:", 70, 480);
    doc.setFontType("normal");
    doc.text(this.h_ant_enf_cardiovascular, 170, 480);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 495);
    doc.setFontType("normal");
    doc.text(this.h_ant_enf_cardiovascular_detalle.substr(0,72), 115, 495);
    doc.text(this.h_ant_enf_cardiovascular_detalle.substr(72,80), 70, 510);


    doc.setFontType("bold");
    doc.text("Enf.Pulmonar:", 70, 525);
    doc.setFontType("normal");
    doc.text(this.h_ant_enf_pulmonar, 170, 525);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 540);
    doc.setFontType("normal");
    doc.text(this.h_ant_enf_pulmonar_detalle.substr(0,72), 115, 540);
    doc.text(this.h_ant_enf_pulmonar_detalle.substr(72,80), 72, 555);


    doc.setFontType("bold");
    doc.text("Diabetes:", 70, 570);
    doc.setFontType("normal");
    doc.text(this.h_ant_diabetes, 170, 570);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 585);
    doc.setFontType("normal");
    doc.text(this.h_ant_diabetes_detalle.substr(0,72), 115, 585);
    doc.text(this.h_ant_diabetes_detalle.substr(72,80), 70, 600);


    doc.setFontType("bold");
    doc.text("Aler.Alimentarias:", 70, 615);
    doc.setFontType("normal");
    doc.text(this.h_ant_ale_alimentarias, 170, 615);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 630);
    doc.setFontType("normal");
    doc.text(this.h_ant_ale_alimentarias_detalle.substr(0,72), 115, 630);
    doc.text(this.h_ant_ale_alimentarias_detalle.substr(72,80), 70, 645);

    

    doc.setFontType("bold");
    doc.text("Aler.Medicamentos:", 70, 660);
    doc.setFontType("normal");
    doc.text(this.h_ant_ale_medicamentosas, 170, 660);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 675);
    doc.setFontType("normal");
    doc.text(this.h_ant_ale_medicamentosas_detalle.substr(0,72), 115, 675);
    doc.text(this.h_ant_ale_medicamentosas_detalle.substr(72,80), 70, 690);



    doc.setFontType("bold");
    doc.text("Colesterol:", 70, 705);
    doc.setFontType("normal");
    doc.text(this.h_ant_colesterol, 170, 705);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 720);
    doc.setFontType("normal");
    doc.text(this.h_ant_colesterol_detalle.substr(0,72), 115, 720);
    doc.text(this.h_ant_colesterol_detalle.substr(72,80), 70, 735);



    doc.setFontType("bold");
    doc.text("T3, T4, TSH:", 70, 750);
    doc.setFontType("normal");
    doc.text(this.h_ant_tsh, 170, 750);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 765);
    doc.setFontType("normal");
    doc.text(this.h_ant_tsh_detalle.substr(0,72), 115, 765);
    doc.text(this.h_ant_tsh_detalle.substr(72,80), 70, 780);



    doc.addPage();
    doc.setFontType("bold");
    doc.text("Quirúrgicos:", 70, 60);
    doc.setFontType("normal");
    doc.text(this.h_ant_quirurgicos, 170, 60);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 75);
    doc.setFontType("normal");
    doc.text(this.h_ant_quirurgicos_detalle.substr(0,72), 115, 75);
    doc.text(this.h_ant_quirurgicos_detalle.substr(72,80), 70, 90);



    doc.setFontType("bold");
    doc.text("Otros:", 70, 105);
    doc.setFontType("normal");
    doc.text(this.h_ant_otros.substr(0,72), 115, 105);
    doc.text(this.h_ant_otros.substr(72,80), 70, 120);


    //////////////////////////////////////////////////////////
    
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("V. EXAMEN", 50, 150);
    
    doc.setTextColor(0, 0, 0);

    doc.text("Piel, Integumentario, Linfático:", 70, 165);
    doc.setFontType("normal");
    doc.text(this.h_exa_piel.substr(0,80), 70, 180);
    doc.text(this.h_exa_piel.substr(80,80), 70, 195);

    doc.setFontType("bold");
    doc.text("Cabeza, Cara, Cuello:", 70, 210);
    doc.setFontType("normal");
    doc.text(this.h_exa_cabeza.substr(0,80), 70, 225);
    doc.text(this.h_exa_cabeza.substr(80,80), 70, 240);

    doc.setFontType("bold");
    doc.text("Ojo, oído, nariz, garganta:", 70, 255);
    doc.setFontType("normal");
    doc.text(this.h_exa_ojo.substr(0,80), 70, 270);
    doc.text(this.h_exa_ojo.substr(80,80), 70, 285);

    doc.setFontType("bold");
    doc.text("Tórax, Mama:", 70, 300);
    doc.setFontType("normal");
    doc.text(this.h_exa_torax.substr(0,80), 70, 315);
    doc.text(this.h_exa_torax.substr(80,80), 70, 330);

    doc.setFontType("bold");
    doc.text("Ap. Respiratorio:", 70, 345);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_respiratorio.substr(0,80), 70, 360);
    doc.text(this.h_exa_ap_respiratorio.substr(80,80), 70, 375);

    doc.setFontType("bold");
    doc.text("Ap. Cardiovascular:", 70, 390);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_cardiovascular.substr(0,80), 70, 405);
    doc.text(this.h_exa_ap_cardiovascular.substr(80,80), 70, 420);

    doc.setFontType("bold");
    doc.text("Ap. Gastrointestinal:", 70, 435);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_gastrointestinal.substr(0,80), 70, 450);
    doc.text(this.h_exa_ap_gastrointestinal.substr(80,80), 70, 465);

    doc.setFontType("bold");
    doc.text("Ap. Genitourinario:", 70, 480);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_genitourinario.substr(0,80), 70, 495);
    doc.text(this.h_exa_ap_genitourinario.substr(80,80), 70, 510);

    doc.setFontType("bold");
    doc.text("Ap. Músculo - Esquelético:", 70, 525);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_musculo.substr(0,80), 70, 540);
    doc.text(this.h_exa_ap_musculo.substr(80,80), 70, 555);

    doc.setFontType("bold");
    doc.text("Neurológico:", 70, 570);
    doc.setFontType("normal");
    doc.text(this.h_exa_ap_neurologico.substr(0,80), 70, 585);
    doc.text(this.h_exa_ap_neurologico.substr(80,80), 70, 600);

    
    
    //////////////////////////////////////////////////////////
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("VI. AYUDA DIAGNÓSTICA", 50, 630);
    
    doc.setTextColor(0, 0, 0);
    doc.text("1. LABORATORIO", 60, 650);
    
    doc.setFontType("bold");
    doc.text("Análisis Laboratorio:", 70, 665);
    doc.setFontType("normal");
    doc.text(this.h_analisis_laboratorio.substr(0,80), 170, 665);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 680);
    doc.setFontType("normal");
    doc.text(this.h_analisis_laboratorio_detalle.substr(0,72), 120, 680);
    doc.text(this.h_analisis_laboratorio_detalle.substr(80,80), 70, 695);

    doc.setFontType("bold");
    doc.text("2. IMAGENOLOGÍA", 60, 715);

    doc.setFontType("bold");
    doc.text("RX:", 70, 730);
    doc.setFontType("normal");
    doc.text(""+this.h_img_rx, 90, 730);

    doc.setFontType("bold");
    doc.text("Tomografía:", 155, 730);
    doc.setFontType("normal");
    doc.text(""+this.h_img_tomografia, 215, 730);

    doc.setFontType("bold");
    doc.text("Res. Magnética:", 280, 730);
    doc.setFontType("normal");
    doc.text(""+this.h_img_resonancia, 360, 730);

    doc.setFontType("bold");
    doc.text("Gammagrafía:", 425, 730);
    doc.setFontType("normal");
    doc.text(""+this.h_img_gammagrafia, 495, 730);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 745);
    doc.setFontType("normal");
    doc.text(this.h_imagenologia_detalle.substr(0,72), 120, 745);
    doc.text(this.h_imagenologia_detalle.substr(80,80), 70, 760);

    //////////////////////////////////////////////////////////
    doc.addPage();
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("VII. DIAGNÓSTICO", 50, 60);

    var header = ["CIE", "DIAGNÓSTICO"];

    //DATA
    var data = [];
    //console.log(this.h_diagnostico.length)
    if (this.h_diagnostico.length > 0) {
      for (let i = 0; i < this.h_diagnostico.length; i++) {
        //console.log(data[i])
        data[i] = [this.h_diagnostico[i].code, this.h_diagnostico[i].enfermedad];
      }
    }

    doc.autoTable(header, data, {
      theme: 'striped',
      headerStyles: {},
      bodyStyles: {},
      alternateRowStyles: {},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 80},
      
    });
    
    doc.setTextColor(0, 0, 0);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 200);
    doc.setFontType("normal");
    doc.text(this.h_diagnostico_detalle.substr(0,72), 120, 200);
    doc.text(this.h_diagnostico_detalle.substr(80,80), 70, 215);

    doc.setFontType("bold");
    doc.text("Pronóstico:", 70, 230);
    doc.setFontType("normal");
    doc.text(this.h_pronostico, 140, 230);
    

    //////////////////////////////////////////////////////////
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 150);
    doc.text("VIII. INDICACIONES", 50, 260);
    
    doc.setTextColor(0, 0, 0);
    
    doc.setFontType("bold");
    doc.text("Act.Física:", 70, 275);
    doc.setFontType("normal");
    doc.text(this.h_actividad_fisica, 140, 275);

    doc.setFontType("bold");
    doc.text("Días Descanso:", 280, 275);
    doc.setFontType("normal");
    doc.text(""+this.h_dias_descanso, 360, 275);

    doc.setFontType("bold");
    doc.text("1. MEDICAMENTOSA", 60, 295);

    doc.text("Medicamento N°01:", 70, 310);
    doc.setFontType("normal");
    doc.text(""+this.h_med_1, 170, 310);

    doc.setFontType("bold");
    doc.text("Frecuencia y Detalle:", 70, 325);
    doc.setFontType("normal");
    doc.text(""+this.h_med_1_detalle, 70, 340);

    doc.setFontType("bold");
    doc.text("Medicamento N°02:", 70, 355);
    doc.setFontType("normal");
    doc.text(""+this.h_med_2, 170, 355);

    doc.setFontType("bold");
    doc.text("Frecuencia y Detalle:", 70, 370);
    doc.setFontType("normal");
    doc.text(""+this.h_med_2_detalle, 70, 385);

    doc.setFontType("bold");
    doc.text("Medicamento N°03:", 70, 400);
    doc.setFontType("normal");
    doc.text(""+this.h_med_3, 170, 400);

    doc.setFontType("bold");
    doc.text("Frecuencia y Detalle:", 70, 415);
    doc.setFontType("normal");
    doc.text(""+this.h_med_3_detalle, 70, 430);

    doc.setFontType("bold");
    doc.text("Medicamento N°04:", 70, 445);
    doc.setFontType("normal");
    doc.text(""+this.h_med_4, 170, 445);

    doc.setFontType("bold");
    doc.text("Frecuencia y Detalle:", 70, 460);
    doc.setFontType("normal");
    doc.text(""+this.h_med_4_detalle, 70, 475);

    doc.setFontType("bold");
    doc.text("Medicamento N°05:", 70, 490);
    doc.setFontType("normal");
    doc.text(""+this.h_med_5, 170, 490);

    doc.setFontType("bold");
    doc.text("Frecuencia y Detalle:", 70, 505);
    doc.setFontType("normal");
    doc.text(""+this.h_med_5_detalle, 70, 520);
    

    doc.setFontType("bold");
    doc.text("2. MEDICINA RECUPERATIVA", 60, 540);

    doc.text("Fisioterapia:", 70, 555);
    doc.setFontType("normal");
    doc.text(""+this.h_med_rec_fisioterapia, 135, 555);

    doc.setFontType("bold");
    doc.text("Tipo Fisioterapia:", 170, 555);
    doc.setFontType("normal");
    doc.text(""+this.h_med_rec_fis_tipo, 260, 555);

    doc.setFontType("bold");
    doc.text("Otro Tipo:", 410, 555);
    doc.setFontType("normal");
    doc.text(""+this.h_med_rec_fis_otros, 470, 555);

    doc.setFontType("bold");
    doc.text("Medicina Física Rehabilitación:", 70, 570);
    doc.setFontType("normal");
    doc.text(""+this.h_med_fisica_rehab, 230, 570);


    doc.setFontType("bold");
    doc.text("3. MEDICINA ALTERNATIVA", 60, 590);

    doc.text("Fitoterapia:", 70, 605);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_fitoterapia, 135, 605);

    doc.setFontType("bold");
    doc.text("Fotohemoterapia:", 170, 605);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_fotohemoterapia, 260, 605);

    doc.setFontType("bold");
    doc.text("PRP:", 295, 605);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_prp, 325, 605);

    doc.setFontType("bold");
    doc.text("Cel.Madre:", 360, 605);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_cel_madres, 420, 605);

    doc.setFontType("bold");
    doc.text("Infiltración:", 70, 620);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_infiltracion, 135, 620);

    doc.setFontType("bold");
    doc.text("Baro Cámara:", 250, 620);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_baro_camara, 325, 620);

    doc.setFontType("bold");
    doc.text("Ozonoterapia:", 360, 620);
    doc.setFontType("normal");
    doc.text(""+this.h_med_alt_ozonoterapia, 435, 620);


    doc.setFontType("bold");
    doc.text("4. ESTILO DE VIDA", 60, 640);

    doc.text("Cambio de Estilo de Vida:", 70, 655);
    doc.setFontType("normal");
    doc.text(""+this.h_est_vida, 200, 655);

    doc.setFontType("bold");
    doc.text("Otro Estilo de Vida:", 280, 655);
    doc.setFontType("normal");
    doc.text(""+this.h_est_vida_otros, 380, 655);


    doc.setFontType("bold");
    doc.text("5. INTERCONSULTAS", 60, 675);

    doc.text("Interconsulta N°01:", 70, 690);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_1, 170, 690);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 705);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_1_detalle, 115, 705);

    doc.setFontType("bold");
    doc.text("Interconsulta N°02:", 70, 720);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_2, 170, 720);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 735);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_2_detalle, 115, 735);

    doc.setFontType("bold");
    doc.text("Interconsulta N°03:", 70, 750);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_3, 170, 750);

    doc.setFontType("bold");
    doc.text("Detalle:", 70, 765);
    doc.setFontType("normal");
    doc.text(""+this.h_interc_3_detalle, 115, 765);

    doc.addPage();
    doc.setFontType("bold");
    doc.text("6. SOLICITUD DE ESTUDIOS", 60, 60);
    doc.text(" -LABORATORIO", 60, 80);

    doc.text("Hemograma:", 70, 95);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_hemograma, 140, 95);

    doc.setFontType("bold");
    doc.text("Hemoglobina:", 175, 95);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_hemoglobina, 250, 95);

    doc.setFontType("bold");
    doc.text("Glucosa:", 285, 95);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_glucosa, 335, 95);

    doc.setFontType("bold");
    doc.text("Úrea:", 370, 95);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_urea, 410, 95);


    doc.setFontType("bold");
    doc.text("Creatinina:", 70, 110);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_creatinina, 140, 110);

    doc.setFontType("bold");
    doc.text("Ex.Comp.Orina:", 175, 110);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_ex_comp_orina, 260, 110);

    doc.setFontType("bold");
    doc.text("Hormonales:", 300, 110);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_hormonales, 370, 110);

    doc.setFontType("bold");
    doc.text("Cultivos:", 400, 110);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_cultivos, 450, 110);


    doc.setFontType("bold");
    doc.text(" -IMAGENOLOGÍA", 60, 125);

    doc.text("Ecografía:", 70, 140);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_ecografia, 120, 140);

    doc.setFontType("bold");
    doc.text("Rx:", 155, 140);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_rx, 175, 140);

    doc.setFontType("bold");
    doc.text("Tomografía:", 210, 140);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_tomografia, 270, 140);

    doc.setFontType("bold");
    doc.text("Resonancia Magnética:", 315, 140);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_resonmagnetica, 430, 140);

    doc.setFontType("bold");
    doc.text("Otros:", 70, 155);
    doc.setFontType("normal");
    doc.text(""+this.h_sol_estudios_otros, 70, 170);


    //DESCARGAR PDF Y CERRAR LOS MODALS
    doc.save("hc-"+this.h_doc_ide+"-"+ this.validar_fecha(this.e_cita_fecha)+".pdf");
    this.onCloseHandledAll();
  }

  validar_fecha(fecha){
    var dia = fecha.substr(0,2);
    var mes = fecha.substr(3,2);
    var anio = fecha.substr(6,4);
    
    return anio + "-" + mes + "-" + dia;
  }

  onCloseHandled(){
    this.displayE='none';
  }

  onCloseHandledHPDF(){
    this.displayHPDF='none';
  }

  onCloseHandledAll(){
    this.displayE='none';
    this.displayHPDF='none';
  }

  filtro(valor:string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    
    if(valor.length > 2){
      this.listar(valor);
    }else{
      if(valor.length == 0){
        this.listar_todos();
      }
    }
  }
  
  ngOnInit() {
    this.listar_todos();
  }

  listar_todos(){

    this.loading = true;
    this.e_pacientes = null;

    this.pacienteService.listar_todos().then((data: any) =>{
      this.e_pacientes = data.recordSet.element;
      //console.log(this.e_pacientes)
      this.loading = false;
    });
  }

  listar(filtro){

    this.loading = true;
    this.e_pacientes = null;

    this.pacienteService.listar(filtro).then((data: any) =>{
      this.e_pacientes = data.recordSet.element;
      //console.log(this.elemento)
      this.loading = false;
    });
  }

}
