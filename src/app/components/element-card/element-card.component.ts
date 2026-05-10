import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArcadeItem } from '../../models/arcade-item.model';

@Component({
  selector: 'app-element-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './element-card.component.html',
  styleUrl: './element-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementCardComponent {
  @Input({ required: true }) item!: ArcadeItem;
}