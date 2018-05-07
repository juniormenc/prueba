import { Component, OnInit } from '@angular/core';
import {Router, Route} from '@angular/router';
@Component({
  selector: 'app-especialidad-editar',
  templateUrl: './especialidad-editar.component.html',
  styleUrls: ['./especialidad-editar.component.scss']
})
export class EspecialidadEditarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['modulos/especialidad']);
  }
}
