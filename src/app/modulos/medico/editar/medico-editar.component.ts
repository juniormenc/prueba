import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'medico-editar',
  templateUrl: './medico-editar.component.html',
  styleUrls: ['./medico-editar.component.scss']
})
export class MedicoEditarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['modulos/medico']);
  }

}
