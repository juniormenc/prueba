import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-especialidad-registrar',
  templateUrl: './especialidad-registrar.component.html',
  styleUrls: ['./especialidad-registrar.component.scss']
})
export class EspecialidadRegistrarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['modulos/especialidad']);
  }
}
