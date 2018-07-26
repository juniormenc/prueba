import { Route, RouterModule } from '@angular/router';
import { ReportesComponent } from './reporte.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { ReporteAtencionesComponent } from './reporte-atenciones/reporte-atenciones.component';
import { ReporteCitasComponent } from './reporte-citas/reporte-citas.component';
import { ReporteHistoriasPacienteComponent } from './reporte-historias-paciente/reporte-historias-paciente.component';
import { ReporteIngresosCitasEspecialidadMedicoComponent } from './reporte-ingresos-citas-especialidad-medico/reporte-ingresos-citas-especialidad-medico.component';
import { ReporteIngresosCitasComponent } from './reporte-ingresos-citas/reporte-ingresos-citas.component';
import { ReporteReservasComponent } from './reporte-reservas/reporte-reservas.component';
import { ReporteTurnosMedicoComponent } from './reporte-turnos-medico/reporte-turnos-medico.component';
import { ReporteTurnosComponent } from './reporte-turnos/reporte-turnos.component';

let routes: Route[] = [
    {
        path:'',
        component: ReportesComponent,
        children: [
            { path:'reporte-atenciones', component:ReporteAtencionesComponent },
            { path:'reporte-citas', component: ReporteCitasComponent },
            { path:'reporte-historias-paciente', component:ReporteHistoriasPacienteComponent },
            { path:'reporte-ingresos-citas-especialidad-medico', component:ReporteIngresosCitasEspecialidadMedicoComponent },
            { path:'reporte-ingresos-citas', component:ReporteIngresosCitasComponent },
            { path:'reporte-reservas', component:ReporteReservasComponent },
            { path:'reporte-turnos-medico', component:ReporteTurnosMedicoComponent },
            { path:'reporte-turnos', component:ReporteTurnosComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);