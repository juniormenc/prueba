import { Route, RouterModule } from '@angular/router';
import { HorarioComponent } from './horario.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import {HorarioListarComponent} from './listar/horario-listar.component';
import {HorarioEditarComponent} from './editar/horario-editar.component';
import {HorarioRegistrarComponent} from './registrar/horario-registrar.component';
import {} from './';

let routes: Route[]= [
    {
        path:'',
        component: HorarioComponent,
        children:[
            {path:'', component: HorarioListarComponent},
            {path:'editar/:id',component:HorarioEditarComponent},
            {path:'registrar',component:HorarioRegistrarComponent}
        ]
    }
];
export const routing : ModuleWithProviders = RouterModule.forChild(routes);