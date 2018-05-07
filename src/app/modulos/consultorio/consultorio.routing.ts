import { Route, RouterModule } from '@angular/router';
import { ConsultorioComponent } from './consultorio.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { ConsultorioListarComponent } from './listar/consultorio-listar.component';
import { ConsultorioEditarComponent } from './editar/consultorio-editar.component';
import { ConsultorioRegistrarComponent } from './registrar/consultorio-registrar.component';
//import {PacienteReservarCitaComponent} from './cita/paciente-reservar-cita.component';
import {} from './';

let routes: Route[] = [
    {
        path: '',
        component: ConsultorioComponent,
        children: [
            { path: '',  component: ConsultorioListarComponent },
            { path: 'editar/:id',  component: ConsultorioEditarComponent },
            { path: 'registrar', component:ConsultorioRegistrarComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
