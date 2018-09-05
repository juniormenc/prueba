import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HorarioService } from '../../../servicios/modulos/horario.services';

@Component({
  selector: 'horario-listar',
  templateUrl: './horario-listar.component.html',
  styleUrls: ['./horario-listar.component.scss']
})
export class HorarioListarComponent implements OnInit {

  loading: boolean;

  elemento: Array<any>;

  constructor(private router:Router, public horarioService:HorarioService) {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    
    this.loading = true;
    
    this.horarioService.listar().then((data: any) =>{
      this.elemento = data.recordSet.element;
      this.loading = false;
    });

  }
  
  gotoEditar(id:number){
    this.router.navigate(["/modulos/horario/editar",id]);
  }
  
  gotoRegistrar(){
    this.router.navigate(["/modulos/horario/registrar"]);
  }

}
