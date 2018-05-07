import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorioRegistrarComponent } from './consultorio-registrar.component';

describe('ConsultorioRegistrarComponent', () => {
  let component: ConsultorioRegistrarComponent;
  let fixture: ComponentFixture<ConsultorioRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultorioRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultorioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
