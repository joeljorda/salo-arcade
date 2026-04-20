import { Injectable, signal } from '@angular/core';

export interface Preferit {
  id: number;
  nom: string;
  descripcio: string;
  imatgeUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {

  constructor() { }
}
