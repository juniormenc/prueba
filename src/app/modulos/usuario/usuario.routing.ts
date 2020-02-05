import { Route, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { ModuleWithProviders } from '@angular/core';

//COMPONENTES
import { UsuarioListarComponent } from './listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './registrar/usuario-registrar.component';
import { UsuarioActualizarComponent } from './actualizar/usuario-actualizar.component';

let routes: Route[] = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            { path: '',  component: UsuarioListarComponent },
            { path: 'registrar', component:UsuarioRegistrarComponent },
            { path: 'actualizar/:id', component:UsuarioActualizarComponent },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
