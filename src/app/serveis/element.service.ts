import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  ElementCataleg,
  ElementApiResponse,
  EstatServei,
} from '../models/element.model';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  // Signals per gestionar l'estat de forma reactiva
  private readonly elementsSignal = signal<ElementCataleg[]>([]);
  private readonly estatSignal = signal<EstatServei>('inicial');
  private readonly errorSignal = signal<string>('');

  // Exposem signals com a només lectura
  readonly elements = this.elementsSignal.asReadonly();
  readonly estat = this.estatSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  private apiUrl = `${environment.apiUrl}/elements`;

  // Filtre de categoria, per gestionar la visualització d'elements per categoria
  public filtreActiu = signal<string>('');

  constructor(private http: HttpClient) {}

  /**
   * Obté els elements populars del catàleg
   */
  obtenirPopulars(): void {
    this.estatSignal.set('carregant');
    this.errorSignal.set('');
    this.filtreActiu.set('');

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}?popular=true`)
      .pipe(
        map(adaptarElementsApi),
        tap((elements) => {
          this.elementsSignal.set(elements);
          this.estatSignal.set('exit');
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.estatSignal.set('error');
          this.elementsSignal.set([]);
          return of([]);
        }),
      )
      .subscribe();
  }

  /**
   * Cerca elements per terme de cerca
   */
  cercar(terme: string): void {
    const text = terme.trim();
    if (!text) {
      this.obtenirPopulars();
      return;
    }
    this.estatSignal.set('carregant');
    this.errorSignal.set('');
    this.filtreActiu.set(text);

    this.http
      .get<ElementApiResponse[]>(
        `${this.apiUrl}?nom_like=${encodeURIComponent(terme)}`,
      )
      .pipe(
        map(adaptarElementsApi),
        tap((elements) => {
          this.elementsSignal.set(elements);
          this.estatSignal.set('exit');
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.estatSignal.set('error');
          this.elementsSignal.set([]);
          return of([]);
        }),
      )
      .subscribe();
  }

  /**
   * Reinicia l'estat del servei
   */
  reiniciar(): void {
    this.elementsSignal.set([]);
    this.estatSignal.set('inicial');
    this.errorSignal.set('');
  }

  /**
   * Gestiona errors HTTP i retorna missatges comprensibles
   */
  private gestionarError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Error de client o xarxa
      return `Error de xarxa: ${error.error.message}`;
    }

    // Error del servidor
    switch (error.status) {
      case 0:
        return 'No es pot connectar al servidor. Comprova que json-server està actiu.';
      case 404:
        return "Endpoint no trobat. Verifica la URL de l'API.";
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error desconegut (${error.status}): ${error.message}`;
    }
  }

  /**
   * Gestiona la comprovació de resultats per a la validació asíncrona
   */
  comprovarResultatsCerca(terme: string) {
    return this.http
      .get<
        ElementApiResponse[]
      >(`${this.apiUrl}?nom_like=${encodeURIComponent(terme)}`)
      .pipe(
        map((elements) => elements.length > 0),
        catchError(() => of(false)),
      );
  }
}
