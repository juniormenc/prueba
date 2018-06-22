import { Route, RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { ReservaListarComponent } from './listar/reserva-listar.component';
import { ReservaEnlazarComponent } from './enlazar/reserva-enlazar.component';
import {} from './';

let routes: Route[] = [
    {
        path: '',
        component: ReservaComponent,
        children: [
            { path: '',  component: ReservaListarComponent },
            { path: 'enlazar/:id/:dni',  component: ReservaEnlazarComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
