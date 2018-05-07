import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LbdModule } from './lbd/lbd.module';
import { AppRoutingModule } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LoadingModule } from 'ngx-loading';

//MODULOS IMPORTADOS
import { ModulesModule } from './modulos/modulos.module';
import { LoginModule } from './login/login.module';

//SERVICIOS GENERALES
import { UtilService } from './servicios/global/util.service';
import { ValidacionService } from './servicios/global/validacion.service';
import { SesionService } from './servicios/modulos/sesion.services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
    ModulesModule,
    LoginModule,
    LoadingModule,
    NgbModule.forRoot()
  ],
  providers: [
    UtilService,
    SesionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
