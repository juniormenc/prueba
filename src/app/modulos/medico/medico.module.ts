import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './medico.routing';

//SERVICES

//COMPONENTES
import { MedicoComponent } from './medico.component';
import { MedicoListarComponent } from './listar/medico-listar.component';
import { MedicoEditarComponent } from './editar/medico-editar.component';
import { MedicoRegistrarComponent } from './registrar/medico-registrar.component';

@NgModule({
    imports:[
        routing,
    ],
    declarations:[
        MedicoComponent,
        MedicoListarComponent,
        MedicoEditarComponent,
        MedicoRegistrarComponent
    ],
    entryComponents:[],
    providers:[]

})

export class MedicoModule{}