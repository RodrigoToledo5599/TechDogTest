import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Result } from '../models/Result';
import { SearchAddressApi } from '../api/search-address-api';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root',
})
export class SearchAddressService {
  constructor(private serviceApi: SearchAddressApi) { }
  getAddress(cep: string): Observable<Result<Address>> { 
    return this.serviceApi.getAddress(cep).pipe(
      map(res => {
        if (res.statusCode === 404) {
          console.warn('CEP não encontrado');
        }
        return res;
      })
    );
    
  }
}
