import { Component } from '@angular/core';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';
import { Element } from './models/element.model';
import { ELEMENTS } from './mocks/dades-mock';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarraCercaComponent, LlistaElementsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  elements: Element[] = ELEMENTS;
  
  onSearch(searchText: string): void {
    const text = searchText.toLowerCase();

    this.elements = ELEMENTS.filter(element =>
      element.name.toLowerCase().includes(text)
    );
  }  
}
