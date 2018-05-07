import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'especialidad-listar',
  templateUrl: './especialidad-listar.component.html',
  styleUrls: ['./especialidad-listar.component.scss']
})
export class EspecialidadListarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  gotoEditar(id:number){
    this.router.navigate(["/modulos/especialidad/editar",id]);
  }
  
  gotoRegistrar(){
    this.router.navigate(["/modulos/especialidad/registrar"]);
  }
}
