import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './reporte.routing';
//import { NgDatepickerModule } from 'ng2-datepicker';

//SERVICES
import { TurnoAtencionService } from '../../servicios/modulos/turno-atencion.services';
import { EspecialidadService } from '../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../servicios/modulos/medico.services';
import { CitaService } from '../../servicios/modulos/cita.services';
import { PacienteService } from '../../servicios/modulos/paciente.services';
import { ExternoService } from '../../servicios/modulos/externo.services';

//COMPONENTES
import { ReportesComponent } from './reporte.component';
import { ReporteTurnosComponent } from './reporte-turnos/reporte-turnos.component';
import { ReporteAtencionesComponent } from './reporte-atenciones/reporte-atenciones.component';
import { ReporteReservasComponent } from './reporte-reservas/reporte-reservas.component';
import { ReporteCitasComponent } from './reporte-citas/reporte-citas.component';
import { ReporteTurnosMedicoComponent } from './reporte-turnos-medico/reporte-turnos-medico.component';
import { ReporteIngresosCitasComponent } from './reporte-ingresos-citas/reporte-ingresos-citas.component';
import { ReporteIngresosCitasEspecialidadMedicoComponent } from './reporte-ingresos-citas-especialidad-medico/reporte-ingresos-citas-especialidad-medico.component';
import { ReporteHistoriasPacienteComponent } from './reporte-historias-paciente/reporte-historias-paciente.component';

@NgModule({
    imports:[
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        //NgDatepickerModule
    ],
    declarations:[
        ReportesComponent,
        ReporteTurnosComponent,
        ReporteAtencionesComponent,
        ReporteReservasComponent,
        ReporteCitasComponent,
        ReporteTurnosMedicoComponent,
        ReporteIngresosCitasComponent,
        ReporteIngresosCitasEspecialidadMedicoComponent,
        ReporteHistoriasPacienteComponent
    ],
    entryComponents:[],
    providers:[
        TurnoAtencionService,
        EspecialidadService,
        MedicoService,
        CitaService,
        PacienteService,
        ExternoService
    ]
})

export class ReporteModule{}