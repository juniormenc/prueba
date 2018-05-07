import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorioListarComponent } from './consultorio-listar.component';

describe('ConsultorioListarComponent', () => {
  let component: ConsultorioListarComponent;
  let fixture: ComponentFixture<ConsultorioListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultorioListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultorioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
