import { Routes, RouterModule } from '@angular/router';
import { ModulosComponent } from './modulos.component';
import { ModuleWithProviders } from '@angular/core';
import { GlobalInicioComponent } from './global/inicio/global-inicio.component';

export const routes: Routes = [
    {
        path: 'modulos',
        component: ModulosComponent,
        children: [
            { path: 'inicio', component: GlobalInicioComponent },
            { path: 'paciente', loadChildren: './paciente/paciente.module#PacienteModule' },
            { path: 'consultorio', loadChildren: './consultorio/consultorio.module#ConsultorioModule' },
            { path: 'medico', loadChildren: './medico/medico.module#MedicoModule' },
            { path:'horario', loadChildren: './horario/horario.module#HorarioModule'},
            { path: 'reporte', loadChildren: './reporte/reporte.module#ReporteModule'},
            { path:'especialidad', loadChildren: './especialidad/especialidad.module#EspecialidadModule'},
            { path:'cita-paciente', loadChildren: './cita-paciente/cita-paciente.module#AtencionPacienteModule'},
            { path:'turno-atencion', loadChildren: './turno-atencion/turno-atencion.module#TurnoAtencionModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);