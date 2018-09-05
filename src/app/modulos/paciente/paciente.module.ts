import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './paciente.routing';

//SERVICES
import { PacienteService } from '../../servicios/modulos/paciente.services';
import { EspecialidadService } from '../../servicios/modulos/especialidad.services';
import { MedicoService } from '../../../app/servicios/modulos/medico.services';
import { ConsultorioService } from '../../../app/servicios/modulos/consultorio.services';
import { HorarioService } from '../../../app/servicios/modulos/horario.services';
import { CitaService } from '../../../app/servicios/modulos/cita.services';
import { TurnoAtencionService } from '../../../app/servicios/modulos/turno-atencion.services';
import { ExternoService } from '../../../app/servicios/modulos/externo.services';

//COMPONENTES
import { PacienteComponent } from './paciente.component';
import { PacienteListarComponent } from './listar/paciente-listar.component';
import { PacienteRegistrarComponent } from './registrar/paciente-registrar.component';
import { PacienteEditarComponent } from './editar/paciente-editar.component';
import { PacienteReservarCitaComponent } from './cita/paciente-reservar-cita.component';

@NgModule({
    imports: [
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        PacienteComponent,
        PacienteListarComponent,
        PacienteRegistrarComponent,
        PacienteEditarComponent,
        PacienteReservarCitaComponent
    ],
    entryComponents: [
    ],
    providers: [
        PacienteService,
        EspecialidadService,
        MedicoService,
        ConsultorioService,
        HorarioService,
        CitaService,
        TurnoAtencionService,
        ExternoService
    ]
})


export class PacienteModule { }
