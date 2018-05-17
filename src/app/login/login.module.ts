import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { SidebarModule } from './../sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';

import { routing } from './login.routing';

import { LoginComponent } from './login.component';
import { SpinerComponent } from '../recursos/spinner/spinner.component';

import { SettingsService } from '../servicios/global/settings.service';

@NgModule({
    imports: [CommonModule, routing, NavbarModule, FooterModule, SidebarModule, ToasterModule, FormsModule],
    declarations: [
        LoginComponent,
        SpinerComponent,
    ],
    providers: [
        SettingsService
    ]
})
export class LoginModule { }