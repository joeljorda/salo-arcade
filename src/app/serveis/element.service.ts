import { Injectable, inject, signal } from "@angular/core";
import { ElementApiResponse, ElementCataleg } from "../models/element.model";
import { adaptarElementsApi } from "../adaptadors/element.adaptador";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { finalize, catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/elements`;

  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal(false);
  private _error = signal<string | null>(null);

  readonly elements = this._elements.asReadonly();
  readonly carregant = this._carregant.asReadonly();
  readonly error = this._error.asReadonly();

  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}?popular=true`)
      .pipe(
        map((resposta) => adaptarElementsApi(resposta)),
        catchError((error) => {
          this._error.set("Error al carregar els elements populars");
          this._elements.set([]);
          return of([]);
        }),
        finalize(() => this._carregant.set(false)),
      )
      .subscribe((elements) => this._elements.set(elements));
  }

  cercar(terme: string): void {
    const text = terme.trim();
    if (!text) {
      this.obtenirPopulars();
      return;
    }
    this._carregant.set(true);
    this._error.set(null);

    this.http
      .get<ElementApiResponse[]>(
        `${this.apiUrl}?nom_like=${encodeURIComponent(text)}`,
      )
      .pipe(
        map((resposta) => adaptarElementsApi(resposta)),
        catchError(() => {
          this._error.set("Error al cercar els elements");
          this._elements.set([]);
          return of([]);
        }),
        finalize(() => this._carregant.set(false)),
      )
      .subscribe((elements) => this._elements.set(elements));
  }
}
