
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferitsService, Preferit } from '../../serveis/preferits.service';

@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferits-panel.component.html',
  styleUrl: './preferits-panel.component.scss'
})
export class PreferitsPanelComponent implements OnInit {
  formulariNotes: FormGroup;
  preferitSeleccionat: Preferit | null = null;

  constructor(
    private fb: FormBuilder,
    public preferitsService: PreferitsService
  ) {
    this.formulariNotes = this.fb.group({
      notes: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get notes(): FormArray<FormControl<string | null>> {
    return this.formulariNotes.get('notes') as FormArray<FormControl<string | null>>;
  }

  seleccionarPreferit(preferit: Preferit): void {
    this.preferitSeleccionat = preferit;
    this.notes.clear();

    preferit.notes.forEach((nota) => {
      this.notes.push(
        this.fb.control(nota, [
          Validators.required,
          Validators.minLength(3)
        ])
      );
    });

    this.afegirCampBuit();
  }

  afegirCampBuit(): void {
    this.notes.push(
      this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ])
    );
  }

  afegirNota(): void {
    if (!this.preferitSeleccionat) return;

    const ultimIndex = this.notes.length -1;
    const ultimControl = this.notes.at(ultimIndex);

    if (ultimControl.valid) {
      const nota = ultimControl.value?.trim();
      this.preferitsService.afegirNota(this.preferitSeleccionat.elementId, nota!);

      const preferitActualitzat = this.preferitsService.obtenirPreferit(this.preferitSeleccionat.elementId);
      if (preferitActualitzat) {
        this.seleccionarPreferit(preferitActualitzat);
      }
    }
  }

  eliminarNota(index: number): void {
    if (!this.preferitSeleccionat) return;

    this.preferitsService.eliminarNota(this.preferitSeleccionat.elementId, index); 

    const preferitActualitzat = this.preferitsService.obtenirPreferit(this.preferitSeleccionat.elementId); 

    if (preferitActualitzat) {
      this.seleccionarPreferit(preferitActualitzat);
    } else {
      this.tancarPanel();
    }
  }

  eliminarPreferit(elementId: string): void {
    this.preferitsService.eliminarPreferit(elementId);
    
    if (this.preferitSeleccionat?.elementId === elementId) {
      this.tancarPanel();
    }
  }

  tancarPanel(): void {
    this.preferitSeleccionat = null;
    this.notes.clear();
  }



}
