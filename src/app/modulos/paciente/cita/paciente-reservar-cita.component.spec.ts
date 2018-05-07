import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteReservarCitaComponent } from './paciente-reservar-cita.component';

describe('PacienteReservarCitaComponent', () => {
  let component: PacienteReservarCitaComponent;
  let fixture: ComponentFixture<PacienteReservarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteReservarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteReservarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
