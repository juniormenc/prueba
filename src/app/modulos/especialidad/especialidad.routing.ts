import { Route, RouterModule } from '@angular/router';
import { EspecialidadComponent } from './especialidad.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import {EspecialidadListarComponent} from './listar/especialidad-listar.component';
import {EspecialidadRegistrarComponent} from './registrar/especialidad-registrar.component';
import {EspecialidadEditarComponent} from './editar/especialidad-editar.component';



let routes: Route[] = [
    {
        path: '',
        component: EspecialidadComponent,
        children:[
            {path:'', component:EspecialidadListarComponent},
            {path:'editar/:id', component:EspecialidadEditarComponent},
            {path:'registrar', component: EspecialidadRegistrarComponent}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);