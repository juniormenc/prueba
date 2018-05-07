import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'medico-listar',
  templateUrl: './medico-listar.component.html',
  styleUrls: ['./medico-listar.component.scss']
})
export class MedicoListarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEditar(id:number){
    this.router.navigate(['modulos/medico/editar',id]);
  }

  goToRegistrar(){
    this.router.navigate(['modulos/medico/registrar']);
  }
}
