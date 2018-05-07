import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoRegistrarComponent } from './medico-registrar.component';

describe('MedicoRegistrarComponent', () => {
  let component: MedicoRegistrarComponent;
  let fixture: ComponentFixture<MedicoRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
