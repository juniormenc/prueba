import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './reserva.routing';

//SERVICES
import { CitaService } from '../../../app/servicios/modulos/cita.services';
import { PacienteService } from '../../../app/servicios/modulos/paciente.services';

//COMPONENTES
import { ReservaComponent } from './reserva.component';
import { ReservaListarComponent } from './listar/reserva-listar.component';
import { ReservaEnlazarComponent } from './enlazar/reserva-enlazar.component';

@NgModule({
    imports: [
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        ReservaComponent,
        ReservaListarComponent,
        ReservaEnlazarComponent
    ],
    entryComponents: [
    ],
    providers: [
        CitaService,
        PacienteService,
    ]
})


export class ReservaModule { }
