import { Route, RouterModule } from '@angular/router';
import { TurnoAtencionComponent } from './turno-atencion.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { TurnoAtencionListarComponent } from './listar/turno-atencion-listar.component';
import { TurnoAtencionEditarComponent } from './editar/turno-atencion-editar.component';
import { TurnoAtencionRegistrarComponent } from './registrar/turno-atencion-registrar.component';
import {} from './';

let routes: Route[] = [
    {
        path: '',
        component: TurnoAtencionComponent,
        children: [
            { path: '',  component: TurnoAtencionListarComponent },
            { path: 'editar/:id',  component: TurnoAtencionEditarComponent },
            { path: 'registrar', component:TurnoAtencionRegistrarComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
