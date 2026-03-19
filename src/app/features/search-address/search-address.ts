import { Component } from '@angular/core';
import { SearchAddressForm } from './components/search-address-form/search-address-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-address',
  imports: [SearchAddressForm, CommonModule],
  templateUrl: './search-address.html',
  styleUrl: './search-address.scss',
})
export class SearchAddress {
  constructor() { }
}
