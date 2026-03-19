import { TestBed } from '@angular/core/testing';

import { SearchAddressApi } from './search-address-api';

describe('SearchAddressApi', () => {
  let service: SearchAddressApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAddressApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
