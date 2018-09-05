import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './cita-paciente.routing';

//COMPONENTES
import {AtencionPacienteComponent} from './cita-paciente.component';

import { CitaPacienteListarComponent } from './listar/cita-paciente-listar.component';
import { CitaPacienteRegistrarComponent } from './registrar/cita-paciente-registrar.component';

//SERVICES
import { CitaService } from '../../servicios/modulos/cita.services';
import { TurnoAtencionService } from '../../servicios/modulos/turno-atencion.services';
import { PacienteService } from '../../servicios/modulos/paciente.services';
import { ExternoService } from '../../servicios/modulos/externo.services';
import { CieService } from '../../servicios/modulos/cie.services';

//COMPONENTES
@NgModule({
    imports:[
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations:[
        AtencionPacienteComponent,
        CitaPacienteListarComponent,
        CitaPacienteRegistrarComponent
    ],
    entryComponents:[],
    providers:[
        CitaService,
        TurnoAtencionService,
        PacienteService,
        ExternoService,
        CieService,
    ]
})
export class AtencionPacienteModule{}
