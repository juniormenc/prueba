import { Route, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { PacienteListarComponent } from './listar/paciente-listar.component';
import { PacienteEditarComponent } from './editar/paciente-editar.component';
import { PacienteRegistrarComponent } from './registrar/paciente-registrar.component';
import {PacienteReservarCitaComponent} from './cita/paciente-reservar-cita.component';
import {} from './';

let routes: Route[] = [
    {
        path: '',
        component: PacienteComponent,
        children: [
            { path: '',  component: PacienteListarComponent },
            { path: 'editar/:id',  component: PacienteEditarComponent },
            { path: 'registrar', component:PacienteRegistrarComponent },
            { path:'reservar-cita/:id', component:PacienteReservarCitaComponent}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
