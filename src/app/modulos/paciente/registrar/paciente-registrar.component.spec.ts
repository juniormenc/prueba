import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteRegistrarComponent } from './paciente-registrar.component';

describe('PacienteRegistrarComponent', () => {
  let component: PacienteRegistrarComponent;
  let fixture: ComponentFixture<PacienteRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
