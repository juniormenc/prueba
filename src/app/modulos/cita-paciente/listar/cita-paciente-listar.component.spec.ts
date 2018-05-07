import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaPacienteListarComponent } from './cita-paciente-listar.component';

describe('CitaPacienteListarComponent', () => {
  let component: CitaPacienteListarComponent;
  let fixture: ComponentFixture<CitaPacienteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaPacienteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaPacienteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
