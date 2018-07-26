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

      for (let i = 0; i < this.elemento.length; i++) {
        if(this.elemento[i].estado == false){
          //CAMBIAR COLOR
          //console.log(this.elemento[i].estado)
        }
        
      }

      //console.log(this.elemento)
    });

  }
  
  gotoEditar(id:number){
    this.router.navigate(["/modulos/horario/editar",id]);
  }
  
  gotoRegistrar(){
    this.router.navigate(["/modulos/horario/registrar"]);
  }

  cambiarEstado(id, estado){
    
    var v_estado;

    if(estado){
      v_estado = false;
    }else{
      v_estado = true;
    }

    console.log(v_estado);
    this.horarioService.cambiar_estado(id, v_estado)
    .then((data) =>{
      console.log(data);
      this.router.navigate(['/modulos/horario']);
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
