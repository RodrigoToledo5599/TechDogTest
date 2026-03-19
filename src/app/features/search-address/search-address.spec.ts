import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddress } from './search-address';

describe('SearchAddress', () => {
  let component: SearchAddress;
  let fixture: ComponentFixture<SearchAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
