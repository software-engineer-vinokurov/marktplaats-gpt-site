import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangedImagesComponent } from './arranged-images.component';

describe('ArrangedImagesComponent', () => {
  let component: ArrangedImagesComponent;
  let fixture: ComponentFixture<ArrangedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangedImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrangedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
