import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAtencionRegistrarComponent } from './turno-atencion-registrar.component';

describe('TurnoAtencionRegistrarComponent', () => {
  let component: TurnoAtencionRegistrarComponent;
  let fixture: ComponentFixture<TurnoAtencionRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoAtencionRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoAtencionRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
