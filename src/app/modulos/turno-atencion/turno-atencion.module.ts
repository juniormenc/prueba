import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './turno-atencion.routing';

//SERVICES
import { EspecialidadService } from '../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../../app/servicios/modulos/medico.services';
import { ConsultorioService } from '../../../app/servicios/modulos/consultorio.services';
import { HorarioService } from '../../../app/servicios/modulos/horario.services';
import { CitaService } from '../../../app/servicios/modulos/cita.services';
import { TurnoAtencionService } from '../../../app/servicios/modulos/turno-atencion.services';

//COMPONENTES
import { TurnoAtencionComponent } from './turno-atencion.component';
import { TurnoAtencionListarComponent } from './listar/turno-atencion-listar.component';
import { TurnoAtencionRegistrarComponent } from './registrar/turno-atencion-registrar.component';
import { TurnoAtencionEditarComponent } from './editar/turno-atencion-editar.component';

@NgModule({
    imports: [
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        TurnoAtencionComponent,
        TurnoAtencionListarComponent,
        TurnoAtencionRegistrarComponent,
        TurnoAtencionEditarComponent
    ],
    entryComponents: [
    ],
    providers: [
        TurnoAtencionService,
        EspecialidadService,
        MedicoService,
        ConsultorioService,
        HorarioService,
        CitaService
    ]
})


export class TurnoAtencionModule { }
