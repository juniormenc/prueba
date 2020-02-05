import { Routes, RouterModule } from '@angular/router';
import { ModulosComponent } from './modulos.component';
import { ModuleWithProviders } from '@angular/core';
import { GlobalInicioComponent } from './global/inicio/global-inicio.component';

export const routes: Routes = [
    {
        path: 'modulos',
        component: ModulosComponent,
        children: [
            { path: 'inicio', component: GlobalInicioComponent },
            { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);