import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProcessComponent } from './purchase-process.component';

describe('PurchaseProcessComponent', () => {
  let component: PurchaseProcessComponent;
  let fixture: ComponentFixture<PurchaseProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
