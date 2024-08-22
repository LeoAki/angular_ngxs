import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInformationComponent } from './generic-information.component';

describe('GenericInformationComponent', () => {
  let component: GenericInformationComponent;
  let fixture: ComponentFixture<GenericInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
