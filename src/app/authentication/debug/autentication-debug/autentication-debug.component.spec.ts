import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticationDebugComponent } from './autentication-debug.component';

describe('AutenticationDebugComponent', () => {
  let component: AutenticationDebugComponent;
  let fixture: ComponentFixture<AutenticationDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticationDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticationDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
