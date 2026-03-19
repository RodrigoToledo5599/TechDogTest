import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddressForm } from './search-address-form';

describe('SearchAddressForm', () => {
  let component: SearchAddressForm;
  let fixture: ComponentFixture<SearchAddressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAddressForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAddressForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
