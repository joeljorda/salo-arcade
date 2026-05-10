import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);

  itemId = this.route.snapshot.paramMap.get('id');
}