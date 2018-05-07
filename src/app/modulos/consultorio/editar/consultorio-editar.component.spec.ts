import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorioEditarComponent } from './consultorio-editar.component';

describe('ConsultorioEditarComponent', () => {
  let component: ConsultorioEditarComponent;
  let fixture: ComponentFixture<ConsultorioEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultorioEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultorioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
