import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAtencionEditarComponent } from './turno-atencion-editar.component';

describe('TurnoAtencionEditarComponent', () => {
  let component: TurnoAtencionEditarComponent;
  let fixture: ComponentFixture<TurnoAtencionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoAtencionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoAtencionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
