import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medico-registrar',
  templateUrl: './medico-registrar.component.html',
  styleUrls: ['./medico-registrar.component.scss']
})
export class MedicoRegistrarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['modulos/medico']);
  }

}
