import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxMarktplaatsNlComponent } from './sandbox-marktplaats.nl.component';

describe('SandboxMarktplaatsNlComponent', () => {
  let component: SandboxMarktplaatsNlComponent;
  let fixture: ComponentFixture<SandboxMarktplaatsNlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandboxMarktplaatsNlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SandboxMarktplaatsNlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
