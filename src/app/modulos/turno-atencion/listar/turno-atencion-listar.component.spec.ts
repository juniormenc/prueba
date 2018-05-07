import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAtencionListarComponent } from './turno-atencion-listar.component';

describe('TurnoAtencionListarComponent', () => {
  let component: TurnoAtencionListarComponent;
  let fixture: ComponentFixture<TurnoAtencionListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoAtencionListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoAtencionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
