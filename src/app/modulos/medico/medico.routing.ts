import { Route, RouterModule } from '@angular/router';
import { MedicoComponent } from './medico.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import {MedicoListarComponent} from './listar/medico-listar.component';
import {} from './';
import { MedicoEditarComponent } from './editar/medico-editar.component';
import { MedicoRegistrarComponent } from './registrar/medico-registrar.component';

let routes: Route[] = [
    {
        path: '',
        component: MedicoComponent,
        children:[
            {path:'',component:MedicoListarComponent},
            {path:'editar/:id',component:MedicoEditarComponent},
            {path:'registrar',component:MedicoRegistrarComponent}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);