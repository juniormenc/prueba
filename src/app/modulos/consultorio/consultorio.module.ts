import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './consultorio.routing';

//SERVICES
import { ConsultorioService } from '../../../app/servicios/modulos/consultorio.services';

//COMPONENTES
import { ConsultorioComponent } from './consultorio.component';
import { ConsultorioListarComponent } from './listar/consultorio-listar.component';

import { ConsultorioRegistrarComponent } from './registrar/consultorio-registrar.component';
import { ConsultorioEditarComponent } from './editar/consultorio-editar.component';
//import { PacienteReservarCitaComponent } from './cita/paciente-reservar-cita.component';


@NgModule({
    imports: [
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        ConsultorioComponent,
        ConsultorioListarComponent,
        ConsultorioRegistrarComponent,
        ConsultorioEditarComponent,
        //PacienteReservarCitaComponent
    ],
    entryComponents: [
    ],
    providers: [
        ConsultorioService,
    ]
})


export class ConsultorioModule { }
