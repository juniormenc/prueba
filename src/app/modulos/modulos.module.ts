import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { SidebarModule } from './../sidebar/sidebar.module';
import { ToasterModule } from 'angular2-toaster';
import { Daterangepicker } from 'ng2-daterangepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './modulos.routing';

import { ModulosComponent } from './modulos.component';
import { SpinerGlobalComponent } from './global/recursos/spinner/spinner-global.component';
import { LbdModule } from './../lbd/lbd.module';

//MODALS
import { GlobalInicioComponent } from './global/inicio/global-inicio.component';
//SERVICIOS PARA MODALS

//Valitadors Directive
@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        NavbarModule,
        FooterModule,
        SidebarModule,
        ToasterModule,
        Daterangepicker,
        LbdModule
    ],
    declarations: [
        ModulosComponent,
        SpinerGlobalComponent,
        GlobalInicioComponent
    ],
    entryComponents: [
    ],
    providers: [
        
    ]
})
export class ModulesModule {
}