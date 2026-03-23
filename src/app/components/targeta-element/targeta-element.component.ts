import { Component, Input } from '@angular/core';
import { Element } from '../../models/element.model';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-targeta-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-element.component.html',
  styleUrl: './targeta-element.component.scss',
})
export class TargetaElementComponent {
  @Input() element!: Element;
}
