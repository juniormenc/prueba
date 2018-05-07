import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaPacienteRegistrarComponent } from './cita-paciente-registrar.component';

describe('CitaPacienteRegistrarComponent', () => {
  let component: CitaPacienteRegistrarComponent;
  let fixture: ComponentFixture<CitaPacienteRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaPacienteRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaPacienteRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
