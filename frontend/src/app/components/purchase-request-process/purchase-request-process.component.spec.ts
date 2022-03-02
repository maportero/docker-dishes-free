import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestProcessComponent } from './purchase-request-process.component';

describe('PurchaseRequestProcessComponent', () => {
  let component: PurchaseRequestProcessComponent;
  let fixture: ComponentFixture<PurchaseRequestProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRequestProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
