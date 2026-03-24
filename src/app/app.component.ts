import { Component } from '@angular/core';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';
import { Element } from './models/element.model';
import { ELEMENTS } from './mocks/dades-mock';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarraCercaComponent, LlistaElementsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  elements: Element[] = ELEMENTS;
  searchMessage: string = '';

  onSearch(searchText: string): void {
    const text = searchText.trim().toLowerCase();

    if (text.length === 0) {
      this.elements = ELEMENTS;
      this.searchMessage = '';
      return;
    }

    if (text.length < 3) {
      this.elements = [];
      this.searchMessage = "Escriu mínim 3 lletres.";
      return;
    }

    this.elements = ELEMENTS.filter(element =>
      element.name.toLowerCase().includes(text)
    );

    if (this.elements.length === 0) {
      this.searchMessage = "No s'ha trobat cap joc.";
    } else {
      this.searchMessage = '';
    }
  }
}