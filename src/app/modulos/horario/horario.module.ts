import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './horario.routing';

//SERVICES
import { HorarioService } from '../../servicios/modulos/horario.services';

//COMPONENTES
import { HorarioComponent } from './horario.component';
import { HorarioListarComponent } from './listar/horario-listar.component';
import { HorarioEditarComponent } from './editar/horario-editar.component';
import { HorarioRegistrarComponent } from './registrar/horario-registrar.component';

@NgModule({
    imports:[
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations:[
        HorarioComponent,
        HorarioListarComponent,
        HorarioEditarComponent,
        HorarioRegistrarComponent
    ],
    entryComponents:[],
    providers:[
        HorarioService
    ]
})

export class HorarioModule{}