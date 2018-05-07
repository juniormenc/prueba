import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './especialidad.routing';


//SERVICES

//COMPONENTES
import { EspecialidadComponent } from './especialidad.component';
import { EspecialidadListarComponent } from './listar/especialidad-listar.component';
import { EspecialidadRegistrarComponent } from './registrar/especialidad-registrar.component';
import { EspecialidadEditarComponent } from './editar/especialidad-editar.component';
@NgModule({
    imports:[routing],
    declarations:[
        EspecialidadComponent,
        EspecialidadListarComponent,
        EspecialidadRegistrarComponent,
        EspecialidadEditarComponent],
    entryComponents:[],
    providers:[]
})

export class EspecialidadModule{}