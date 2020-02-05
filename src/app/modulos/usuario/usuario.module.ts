import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './usuario.routing';

//SERVICES
import { RolService } from '../../servicios/modulos/rol.services';
import { UsuarioService } from '../../servicios/modulos/usuario.services';

//COMPONENTES
import { UsuarioComponent } from './usuario.component';
import { UsuarioListarComponent } from './listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './registrar/usuario-registrar.component';
import { UsuarioActualizarComponent } from './actualizar/usuario-actualizar.component';

import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatPaginatorModule,
    ],
    declarations: [
        UsuarioComponent,
        UsuarioListarComponent,
        UsuarioRegistrarComponent,
        UsuarioActualizarComponent
    ],
    entryComponents: [
    ],
    providers: [
        UsuarioService,
        RolService,
    ]
})


export class UsuarioModule { }
