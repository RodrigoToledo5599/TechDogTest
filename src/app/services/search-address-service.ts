import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchAddressService {
  constructor(private http: HttpClient) { }

  getAddress(cep: string): Observable<any> { // tipar esse any para uma resposta adequada
    var result = this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        delay(2000)
      );

    return result;
  }
}
