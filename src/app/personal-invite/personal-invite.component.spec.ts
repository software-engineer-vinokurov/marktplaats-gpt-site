import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInviteComponent } from './personal-invite.component';

describe('PersonalInviteComponent', () => {
  let component: PersonalInviteComponent;
  let fixture: ComponentFixture<PersonalInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
