import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

export interface Preferit {
  elementId: string;
  elementNom: string;
  notes: string[];
  dataAfegit: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PreferitsService {
  private readonly CLAU_STORAGE = 'preferits-cataleg';
  private readonly preferitsSignal = signal<Preferit[]>([]);

  readonly preferits = this.preferitsSignal.asReadonly();
  readonly totalPreferits = computed(() => this.preferitsSignal().length);

  constructor() {
    this.carregarPreferits();
  }

  /**
   * Carrega preferits des de localStorage
   */
  private carregarPreferits(): void {
    const dades = localStorage.getItem(this.CLAU_STORAGE);

    if (dades) {
      try {
        const preferits = JSON.parse(dades) as Preferit[];
        preferits.forEach((p) => (p.dataAfegit = new Date(p.dataAfegit)));
        this.preferitsSignal.set(preferits);
      } catch (error) {
        console.error('Error carregant preferits:', error);
        this.preferitsSignal.set([]);
      }
    }
  }

  /**
   * Desa preferits a localStorage
   */
  private desarPreferits(): void {
    localStorage.setItem(
      this.CLAU_STORAGE,
      JSON.stringify(this.preferitsSignal()),
    );
  }

  /**
   * Afegeix un element als preferits
   */
  afegirPreferit(element: ElementCataleg): void {
    if (this.esPreferit(element.id)) {
      return;
    }
    const nouPreferit: Preferit = {
      elementId: element.id,
      elementNom: element.titol,
      notes: [],
      dataAfegit: new Date(),
    };
    this.preferitsSignal.update(preferits => [...preferits, nouPreferit]);
    this.desarPreferits();
  }


  /**
   * Elimina un element dels preferits
   */
  eliminarPreferit(elementId: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.filter(p => p.elementId !== elementId)
    );
    this.desarPreferits();
  }


  /**
   * Comprova si un element és preferit
   */
  esPreferit(elementId: string): boolean {
    return this.preferitsSignal().some((p) => p.elementId === elementId);
  }

  /**
   * Afegeix una nota a un preferit
   */
  afegirNota(elementId: string, nota: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.elementId === elementId) {
          return { ...p, notes: [...p.notes, nota] };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Elimina una nota d'un preferit
   */
  eliminarNota(elementId: string, indexNota: number): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.elementId === elementId) {
          const notesActualitzades = [...p.notes];
          notesActualitzades.splice(indexNota, 1);
          return { ...p, notes: notesActualitzades };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Obté un preferit per ID
   */
  obtenirPreferit(elementId: string): Preferit | undefined {
    return this.preferitsSignal().find(p => p.elementId === elementId);
  }  
}
