import { Route, RouterModule } from '@angular/router';
import { AtencionPacienteComponent } from './cita-paciente.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import {} from './';
import {CitaPacienteListarComponent} from './listar/cita-paciente-listar.component';
import {CitaPacienteRegistrarComponent} from './registrar/cita-paciente-registrar.component';

let routes: Route[] = [
    {
        path:'',
        component:AtencionPacienteComponent,
        children:[
            {path:'',component:CitaPacienteListarComponent},
            {path:'registrar/:id/:paciente_id', component: CitaPacienteRegistrarComponent}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);