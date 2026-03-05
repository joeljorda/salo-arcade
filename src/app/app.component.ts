import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ioc-angular-SaloArcade-JoelJorda';

  constructor() {
    console.log('Tot a punt! A què et ve de gust jugar avui?');
  }
}
