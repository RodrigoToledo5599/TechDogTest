import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Result } from '../models/Result';
import { Address } from '../models/Address';


@Injectable({
  providedIn: 'root',
})
export class SearchAddressApi {
  constructor(private http: HttpClient) { }

  getAddress(cep: string): Observable<Result<Address>> { 
    return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`)
    .pipe(
      delay(2000),
      map(data => {
        // o tratamento de busca mal sucedida tem que ser esse mesmo por que a resposta de erro é um:  code 200 {"erro":"true"}
        if(data.erro){
          return new Result<Address>(null, 404, 'CEP Não encontrado')
        }
        else{
          return new Result<Address>(data, 200, 'Sucesso')
        }
      }
      ),
      catchError(err => of(
        new Result<Address>(
          null,
          err.status || 500,
          'Erro ao buscar CEP',
          err
        )
      ))
    );
  }
}
