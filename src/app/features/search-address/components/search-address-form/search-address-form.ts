import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output, signal } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearchAddressService } from '../../../../services/search-address-service';



@Component({
  selector: 'app-skeleton-input',
  standalone: true,
  template: `<div class="skeleton-input"></div>
        <div class="skeleton-input"></div>
        <div class="skeleton-input"></div>
        <div style="display:flex; flex-direction:row; justify-content:space-between; gap:24px;">
            <div class="skeleton-input"></div>
            <div class="skeleton-input"></div>
        </div>`,
  styles: [`
    .skeleton-input {
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(-90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
      background-size: 400% 400%;
      animation: shimmer 1.5s ease-in-out infinite;
      margin-bottom: 12px;
      width: 100%;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonInput { }


interface FormFields {
  cep: FormControl<string>;
  rua: FormControl<string>;
  bairro: FormControl<string>;
  cidade: FormControl<string>;
  estado: FormControl<string>;
  ibge: FormControl<string>;

}

@Component({
  selector: 'app-search-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SkeletonInput],
  templateUrl: './search-address-form.html',
  styleUrl: './search-address-form.scss',
})
export class SearchAddressForm {
  adressForm: FormGroup;
  loading = signal(false);
  enviando = signal(false);
  errorMessage = signal("");
  @Output() cepChange = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private saService: SearchAddressService,

    private zone: NgZone,
    private toastr: ToastrService
  ) {
    this.adressForm = this.formBuilder.group<FormFields>({
      cep: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
      }),
      rua: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      bairro: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      cidade: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      estado: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      ibge: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    });
    this.errorMessage.set("") ;
  }


  ngOnInit() {
    this.adressForm.get('cep')?.valueChanges.subscribe(value => {
      const cep = value ? value?.replace(/\D/g, '') : '';

      if (cep.length === 8) {
        this.fetchAddress(cep);
      }
    });
  }

  // essa função tem apenas como função simular o comportamento de um envio
  sendForm() {
    if (this.adressForm.invalid) {
      this.adressForm.markAllAsTouched();
      this.toastr.error('Preencha os campos corretamente antes de enviar');
      return;
    }

    this.enviando.set(true);

    setTimeout(() => {
      this.toastr.success("Formulário enviado com sucesso");
      this.enviando.set(false);
    }, 2000);
  }

  fetchAddress(cep: string) {
    this.loading.set(true);
    this.saService.getAddress(cep).subscribe({
      next: (data) => {
        // o tratamento de busca mal sucedida tem que ser esse mesmo por que a resposta de erro é um:  code 200 {"erro":"true"}
        
        if (data.erro == "true") {
          this.errorMessage.set("Nenhum resultado encontrado")
          this._cleanAllFieldsButTheAddress();
          this.loading.set(false);
          this.toastr.error("Não foi possível encontrar o CEP")
        }
        if (!data.erro) {
          this.errorMessage.set("")
          this.adressForm.patchValue({
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.estado,
            ibge: data.ibge
          });
          this.loading.set(false);
          this.toastr.success("Endereço encontrado")
        }
        
      },
      error: (err) => {
        this.adressForm.reset();
        this.loading.set(false);
        this.toastr.error('Erro ao buscar endereço');
      }
    });
  }

  cleanAddress() {
    this.adressForm.reset()
  }

  private _cleanAllFieldsButTheAddress() {
    this.adressForm.patchValue({
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      ibge: ""
    });
  }

}

