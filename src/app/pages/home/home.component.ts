import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ElementCardComponent } from '../../components/element-card/element-card.component';
import { ArcadeItem } from '../../models/arcade-item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScrollingModule, ElementCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  itemSize = 140;

  items: ArcadeItem[] = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    title: `Arcade Item ${index + 1}`,
    category: index % 2 === 0 ? 'Classic Arcade' : 'Modern Arcade',
    year: 1980 + (index % 40),
    description: 'Joc de prova de Saló Arcade.',
  }));
}