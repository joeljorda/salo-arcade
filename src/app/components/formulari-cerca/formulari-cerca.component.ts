import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementService } from '../../serveis/element.service';
import { codiDisponibleValidator } from '../../validadors/codi-disponible.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss',
})
export class FormulariCercaComponent implements OnInit {
  formulariCerca!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private elementService: ElementService,
  ) {}

  ngOnInit(): void {
    this.formulariCerca = this.fb.group({
      terme: this.fb.control('', {
        validators: [Validators.minLength(2), Validators.maxLength(50)],
        asyncValidators: [codiDisponibleValidator(this.elementService)],
        updateOn: 'change',
      }),
    });

    // Cerca automàtica amb debounce
    this.formulariCerca.get('terme')?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((valor) => {
        const text = (valor ?? '').trim();

        if (text.length === 0) {
          this.elementService.obtenirPopulars();
          return;
        }

        if (text.length >= 2) {
          this.cercar();
        }
      });
  }

  cercar(): void {
    const terme = this.formulariCerca.get('terme')?.value;
    this.elementService.cercar(terme);
  }

  netejar(): void {
    this.formulariCerca.reset();
    this.elementService.obtenirPopulars();
  }

  get estaCarregant(): boolean {
    return this.elementService.estat() === 'carregant';
  }

  get termeInvalid(): boolean {
    const control = this.formulariCerca.get('terme');
    return !!(control?.invalid && control?.touched);
  }

  get missatgeError(): string {
    const control = this.formulariCerca.get('terme');
    if (control?.hasError('minlength')) {
      return 'La cerca ha de tenir mínim 2 caràcters.';
    }
    if (control?.hasError('maxlength')) {
      return 'La cerca ha de tenir màxim 50 caràcters.';
    }
    if (control?.hasError('sensResultats')) {
      return "No s'han trobat resultats";
    }
    return '';
  }
}
